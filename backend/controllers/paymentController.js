import Stripe from "stripe";
import Booking from "../models/Booking.js";

const getClientUrl = () => process.env.CLIENT_URL || "http://localhost:5173";
const getCurrency = () => process.env.STRIPE_CURRENCY || "usd";
const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY);

const updateBookingFromSession = async (session, update) => {
  const bookingId = session.metadata?.bookingId;

  if (!bookingId) {
    return;
  }

  await Booking.findByIdAndUpdate(bookingId, update);
};

export const createCheckoutSession = async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ message: "Stripe secret key is not configured" });
    }

    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate("destination");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.paymentStatus === "paid") {
      return res.status(400).json({ message: "Booking is already paid" });
    }

    const clientUrl = getClientUrl();
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: getCurrency(),
            product_data: {
              name: booking.destination?.name || "Travel booking",
              description: `${booking.persons} traveler(s)`
            },
            unit_amount: Math.round(booking.totalPrice * 100)
          },
          quantity: 1
        }
      ],
      metadata: {
        bookingId: booking._id.toString(),
        userId: req.user._id.toString()
      },
      payment_intent_data: {
        metadata: {
          bookingId: booking._id.toString(),
          userId: req.user._id.toString()
        }
      },
      success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/payment/cancel?bookingId=${booking._id.toString()}`
    });

    booking.paymentStatus = "pending";
    booking.payment = {
      provider: "stripe",
      checkoutSessionId: session.id,
      paymentIntentId: session.payment_intent || booking.payment?.paymentIntentId
    };
    await booking.save();

    res.json({
      checkoutUrl: session.url,
      sessionId: session.id,
      booking
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const handleStripeWebhook = async (req, res) => {
  const signature = req.headers["stripe-signature"];
  let event = req.body;

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ message: "Stripe secret key is not configured" });
    }

    const stripe = getStripe();

    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } else if (Buffer.isBuffer(req.body)) {
      event = JSON.parse(req.body.toString("utf8"));
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const booking = await Booking.findById(session.metadata?.bookingId);

      if (booking && session.payment_status === "paid") {
        booking.paymentStatus = "paid";
        booking.payment = {
          provider: "stripe",
          checkoutSessionId: session.id,
          paymentIntentId: session.payment_intent,
          paidAt: new Date()
        };
        await booking.save();
      }
    }

    if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object;
      await updateBookingFromSession(session, {
        paymentStatus: "failed",
        "payment.checkoutSessionId": session.id,
        "payment.paymentIntentId": session.payment_intent
      });
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      await updateBookingFromSession(session, {
        paymentStatus: "canceled",
        "payment.checkoutSessionId": session.id
      });
    }

    res.json({ received: true });
  } catch (err) {
    res.status(400).json({ message: `Webhook error: ${err.message}` });
  }
};

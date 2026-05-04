import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import AddDestinationSection from "./components/AddDestinationSection";
import AiPlannerSection from "./components/AiPlannerSection";
import AuthPage from "./components/AuthPage";
import DestinationsSection from "./components/DestinationsSection";
import HeroSlider from "./components/HeroSlider";
import ManageSection from "./components/ManageSection";
import Navbar from "./components/Navbar";
import WorldMapSection from "./components/WorldMapSection";
import { buildLocationImageUrl, emptyDestination, starterDestinations, worldSlides } from "./data/travelData";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("travel_token") || "");
  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [bookingForm, setBookingForm] = useState({ date: "", persons: 1 });
  const [tripForm, setTripForm] = useState({ startDate: "", endDate: "", destinations: [] });
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [destinationForm, setDestinationForm] = useState(emptyDestination);
  const [aiQuery, setAiQuery] = useState("");
  const [aiPlan, setAiPlan] = useState("");

  const shownDestinations = destinations.length ? destinations : starterDestinations;
  const selected = shownDestinations.find((destination) => destination._id === selectedDestination) || shownDestinations[0];

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }),
    [token],
  );

  const request = useCallback(async (path, options = {}) => {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: { ...headers, ...options.headers },
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  }, [headers]);

  const loadDestinations = useCallback(async () => {
    try {
      const data = await request("/destinations");
      setDestinations(data);
      if (data[0]?._id) setSelectedDestination(data[0]._id);
    } catch (error) {
      setMessage(`Using sample destinations. Backend said: ${error.message}`);
    }
  }, [request]);

  const loadProtectedData = useCallback(async () => {
    if (!token) return;

    try {
      const [bookingData, tripData] = await Promise.all([
        request("/bookings"),
        request("/trips"),
      ]);
      setBookings(bookingData);
      setTrips(tripData);
    } catch (error) {
      setMessage(error.message);
    }
  }, [request, token]);

  useEffect(() => {
    if (token) {
      loadDestinations();
      loadProtectedData();
    }
  }, [loadDestinations, loadProtectedData, token]);

  const updateAuth = (event) => {
    setAuthForm({ ...authForm, [event.target.name]: event.target.value });
  };

  const submitAuth = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const body = authMode === "register"
        ? authForm
        : { email: authForm.email, password: authForm.password };
      const data = await request(`/auth/${authMode}`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      localStorage.setItem("travel_token", data.token);
      setToken(data.token);
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("travel_token");
    setToken("");
    setBookings([]);
    setTrips([]);
    setMessage("Signed out.");
  };

  const createDestination = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const images = destinationForm.images.split(",").map((image) => image.trim()).filter(Boolean);
      const locationImage = buildLocationImageUrl(destinationForm.name, destinationForm.location);

      await request("/destinations", {
        method: "POST",
        body: JSON.stringify({
          ...destinationForm,
          price: Number(destinationForm.price),
          rating: Number(destinationForm.rating || 0),
          images: images.length ? images : [locationImage],
        }),
      });
      setDestinationForm(emptyDestination);
      setMessage("Destination added to the database.");
      await loadDestinations();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (event) => {
    event.preventDefault();
    if (!selected?._id || selected._id.startsWith("sample-")) {
      setMessage("Add a real backend destination before booking.");
      return;
    }

    setLoading(true);
    try {
      await request("/bookings", {
        method: "POST",
        body: JSON.stringify({
          destination: selected._id,
          date: bookingForm.date,
          persons: Number(bookingForm.persons),
        }),
      });
      setMessage("Booking created.");
      await loadProtectedData();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const payBooking = async (bookingId) => {
    setLoading(true);

    try {
      const data = await request(`/bookings/${bookingId}/pay`, { method: "PUT" });
      window.location.href = data.checkoutUrl;
    } catch (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  const createTrip = async (event) => {
    event.preventDefault();
    const realDestinations = tripForm.destinations.filter((id) => !id.startsWith("sample-"));

    if (!realDestinations.length) {
      setMessage("Choose at least one destination stored in the backend.");
      return;
    }

    setLoading(true);
    try {
      await request("/trips", {
        method: "POST",
        body: JSON.stringify({ ...tripForm, destinations: realDestinations }),
      });
      setTripForm({ startDate: "", endDate: "", destinations: [] });
      setMessage("Trip saved.");
      await loadProtectedData();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (event) => {
    event.preventDefault();
    if (!selected?._id || selected._id.startsWith("sample-")) {
      setMessage("Reviews need a destination stored in the backend.");
      return;
    }

    setLoading(true);
    try {
      await request("/reviews", {
        method: "POST",
        body: JSON.stringify({
          destination: selected._id,
          rating: Number(reviewForm.rating),
          comment: reviewForm.comment,
        }),
      });
      setReviewForm({ rating: 5, comment: "" });
      setMessage("Review added.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const planWithAi = async (event) => {
    event.preventDefault();
    setLoading(true);
    setAiPlan("");

    try {
      const data = await request("/ai/plan", {
        method: "POST",
        body: JSON.stringify({ query: aiQuery }),
      });
      setAiPlan(data.plan);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTripDestination = (id) => {
    setTripForm((current) => ({
      ...current,
      destinations: current.destinations.includes(id)
        ? current.destinations.filter((item) => item !== id)
        : [...current.destinations, id],
    }));
  };

  if (!token) {
    return (
      <AuthPage
        authForm={authForm}
        authMode={authMode}
        loading={loading}
        message={message}
        onAuthModeChange={setAuthMode}
        onAuthSubmit={submitAuth}
        onAuthUpdate={updateAuth}
      />
    );
  }

  return (
    <main className="app-shell">
      <Navbar onLogout={logout} />
      {message && <p className="notice">{message}</p>}

      <HeroSlider slides={worldSlides} />

      <DestinationsSection
        bookingForm={bookingForm}
        destinations={shownDestinations}
        loading={loading}
        onBookingChange={setBookingForm}
        onBookingSubmit={createBooking}
        onReviewChange={setReviewForm}
        onReviewSubmit={addReview}
        onSelectDestination={setSelectedDestination}
        reviewForm={reviewForm}
        selectedDestination={selected}
      />

      <WorldMapSection />

      <AiPlannerSection
        aiPlan={aiPlan}
        aiQuery={aiQuery}
        loading={loading}
        onPlanSubmit={planWithAi}
        onQueryChange={setAiQuery}
      />

      <ManageSection
        bookings={bookings}
        destinations={shownDestinations}
        loading={loading}
        onPayBooking={payBooking}
        onToggleDestination={toggleTripDestination}
        onTripChange={setTripForm}
        onTripSubmit={createTrip}
        tripForm={tripForm}
        trips={trips}
      />

      <AddDestinationSection
        destinationForm={destinationForm}
        loading={loading}
        onDestinationChange={setDestinationForm}
        onDestinationSubmit={createDestination}
      />
    </main>
  );
}

export default App;

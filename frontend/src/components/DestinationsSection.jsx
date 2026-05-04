import { famousCountries } from "../data/travelData";

const fallbackImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";

function DestinationsSection({
  bookingForm,
  destinations,
  loading,
  onBookingChange,
  onBookingSubmit,
  onReviewChange,
  onReviewSubmit,
  onSelectDestination,
  reviewForm,
  selectedDestination,
}) {
  const selectedPrice = Number(selectedDestination?.price || 0);
  const bookingTotal = selectedPrice * Number(bookingForm.persons || 1);

  return (
    <section className="section-stack" id="destinations">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Explore</p>
          <h2>Famous country routes</h2>
        </div>
        <p className="section-note">Choose a famous country route, then turn a destination into a booking, saved trip, or review.</p>
      </div>

      <div className="country-strip">
        {famousCountries.map((country) => (
          <article className="country-card" key={country.name}>
            <img src={country.image} alt={country.name} />
            <div>
              <span className="floating-badge">Popular</span>
              <h3>{country.name}</h3>
              <p>{country.route}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="section-heading compact-heading">
        <div>
          <p className="eyebrow">Destinations</p>
          <h2>Explore destination options</h2>
        </div>
      </div>

      <div className="destination-layout">
        <div className="destination-grid">
          {destinations.map((destination) => (
            <article
              className={`destination-card ${selectedDestination?._id === destination._id ? "active" : ""}`}
              key={destination._id}
              onClick={() => onSelectDestination(destination._id)}
            >
              <div className="destination-image">
                <img src={destination.images?.[0] || fallbackImage} alt={destination.name} />
                <span className="destination-price">${destination.price}</span>
              </div>
              <div className="destination-body">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <div className="card-meta">
                  <span>{destination.location}</span>
                  <span>{destination.rating || 0} stars</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="panel booking-panel">
          <div className="booking-spotlight">
            <p className="eyebrow">Selected escape</p>
            <h2>{selectedDestination?.name}</h2>
          </div>

          <form onSubmit={onBookingSubmit}>
            <label>Date<input type="date" value={bookingForm.date} onChange={(event) => onBookingChange({ ...bookingForm, date: event.target.value })} required /></label>
            <label>Persons<input type="number" min="1" value={bookingForm.persons} onChange={(event) => onBookingChange({ ...bookingForm, persons: event.target.value })} required /></label>
            <div className="price-line">
              <span>Total</span>
              <strong>${bookingTotal || selectedPrice}</strong>
            </div>
            <button disabled={loading}>Create Booking</button>
          </form>

          <form className="review-form" onSubmit={onReviewSubmit}>
            <label>Rating<input type="number" min="1" max="5" value={reviewForm.rating} onChange={(event) => onReviewChange({ ...reviewForm, rating: event.target.value })} /></label>
            <label>Review<textarea value={reviewForm.comment} onChange={(event) => onReviewChange({ ...reviewForm, comment: event.target.value })} required /></label>
            <button disabled={loading}>Post Review</button>
          </form>
        </aside>
      </div>
    </section>
  );
}

export default DestinationsSection;

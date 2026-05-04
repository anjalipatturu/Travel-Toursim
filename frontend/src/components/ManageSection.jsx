function ManageSection({
  bookings,
  destinations,
  loading,
  onPayBooking,
  onToggleDestination,
  onTripChange,
  onTripSubmit,
  tripForm,
  trips,
}) {
  return (
    <section className="manage-section" id="manage">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Manage</p>
          <h2>Your bookings and trips</h2>
        </div>
      </div>

      <div className="management-grid">
        <div className="panel">
          <h3>Create a saved trip</h3>
          <form onSubmit={onTripSubmit}>
            <div className="checkbox-list">
              {destinations.map((destination) => (
                <label key={destination._id}>
                  <input
                    type="checkbox"
                    checked={tripForm.destinations.includes(destination._id)}
                    onChange={() => onToggleDestination(destination._id)}
                  />
                  {destination.name}
                </label>
              ))}
            </div>
            <label>Start<input type="date" value={tripForm.startDate} onChange={(event) => onTripChange({ ...tripForm, startDate: event.target.value })} required /></label>
            <label>End<input type="date" value={tripForm.endDate} onChange={(event) => onTripChange({ ...tripForm, endDate: event.target.value })} required /></label>
            <button disabled={loading}>Save Trip</button>
          </form>
        </div>

        <div className="panel">
          <h3>Bookings</h3>
          {bookings.length ? bookings.map((booking) => (
            <div className="data-row" key={booking._id}>
              <div>
                <strong>{booking.destination?.name || "Destination"}</strong>
                <span>{new Date(booking.date).toLocaleDateString()} - {booking.persons} person(s)</span>
              </div>
              <div>
                <span className="pill">{booking.paymentStatus}</span>
                {booking.paymentStatus !== "paid" && <button type="button" onClick={() => onPayBooking(booking._id)}>Pay</button>}
              </div>
            </div>
          )) : <p className="muted">No bookings yet.</p>}
        </div>

        <div className="panel">
          <h3>Trips</h3>
          {trips.length ? trips.map((trip) => (
            <div className="data-row" key={trip._id}>
              <div>
                <strong>{trip.destinations?.map((destination) => destination.name).join(", ") || "Trip"}</strong>
                <span>{new Date(trip.startDate).toLocaleDateString()} to {new Date(trip.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          )) : <p className="muted">No saved trips yet.</p>}
        </div>
      </div>
    </section>
  );
}

export default ManageSection;

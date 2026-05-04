import { useEffect, useMemo, useState } from "react";
import { buildLocationImageUrl, fallbackTravelImage } from "../data/travelData";

function AddDestinationSection({
  destinationForm,
  loading,
  onDestinationChange,
  onDestinationSubmit,
}) {
  const previewImage = useMemo(() => {
    const providedImage = destinationForm.images.split(",").map((image) => image.trim()).filter(Boolean)[0];

    return providedImage || buildLocationImageUrl(destinationForm.name, destinationForm.location);
  }, [destinationForm.images, destinationForm.location, destinationForm.name]);

  const [visiblePreview, setVisiblePreview] = useState(previewImage);

  useEffect(() => {
    setVisiblePreview(previewImage);
  }, [previewImage]);

  return (
    <section className="add-section" id="add-destination">
      <div className="add-copy">
        <p className="eyebrow">Content</p>
        <h2>Add destination</h2>
        <p className="muted">New destinations appear in Explore and can be booked, reviewed, and saved into trips.</p>
      </div>

      <div className="add-card">
        <div className="add-preview">
          <img
            src={visiblePreview}
            alt={destinationForm.location || "Destination preview"}
            onError={() => setVisiblePreview(fallbackTravelImage)}
          />
          <div>
            <span>Live preview</span>
            <h3>{destinationForm.name || "Destination name"}</h3>
            <p>{destinationForm.location || "Type a location to preview its travel image"}</p>
          </div>
        </div>

        <form onSubmit={onDestinationSubmit}>
          <label>Name<input value={destinationForm.name} onChange={(event) => onDestinationChange({ ...destinationForm, name: event.target.value })} required /></label>
          <label>Location<input value={destinationForm.location} onChange={(event) => onDestinationChange({ ...destinationForm, location: event.target.value })} required /></label>
          <div className="form-pair">
            <label>Price<input type="number" min="0" value={destinationForm.price} onChange={(event) => onDestinationChange({ ...destinationForm, price: event.target.value })} required /></label>
            <label>Rating<input type="number" min="0" max="5" step="0.1" value={destinationForm.rating} onChange={(event) => onDestinationChange({ ...destinationForm, rating: event.target.value })} /></label>
          </div>
          <label>Description<textarea value={destinationForm.description} onChange={(event) => onDestinationChange({ ...destinationForm, description: event.target.value })} required /></label>
          <label>Image URLs<input value={destinationForm.images} onChange={(event) => onDestinationChange({ ...destinationForm, images: event.target.value })} placeholder="Optional: https://..., https://..." /></label>
          <button disabled={loading}>Add Destination</button>
        </form>
      </div>
    </section>
  );
}

export default AddDestinationSection;

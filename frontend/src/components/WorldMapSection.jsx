import { useState } from "react";
import { famousCountries, mapLocations } from "../data/travelData";

function WorldMapSection() {
  const [activeLocation, setActiveLocation] = useState(mapLocations[0]);
  const [searchValue, setSearchValue] = useState("");
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(activeLocation.query)}&output=embed`;

  const searchMap = (event) => {
    event.preventDefault();
    const query = searchValue.trim();

    if (!query) return;

    setActiveLocation({
      name: query,
      country: "Search result",
      query,
      description: `Google Maps result for ${query}. Explore nearby landmarks, stays, restaurants, and routes.`,
    });
  };

  const openCountry = (country) => {
    setSearchValue(country.name);
    setActiveLocation({
      name: country.name,
      country: "Famous country",
      query: country.name,
      description: country.route,
    });
  };

  return (
    <section className="map-section" id="map">
      <div className="section-heading">
        <div>
          <p className="eyebrow">World map</p>
          <h2>See where your next trip begins</h2>
        </div>
        <p className="section-note">Preview famous travel locations directly on Google Maps before planning the route.</p>
      </div>

      <div className="map-layout">
        <div className="map-control-panel">
          <form className="map-search" onSubmit={searchMap}>
            <label>
              Search any place
              <input
                placeholder="Enter a country, city, beach, hotel..."
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
            </label>
            <button type="submit">Show Map</button>
          </form>

          <div className="map-country-cloud">
            <p className="eyebrow">Famous countries</p>
            {famousCountries.map((country) => (
              <button key={country.name} onClick={() => openCountry(country)} type="button">
                {country.name}
              </button>
            ))}
          </div>

          <div className="map-selector">
          {mapLocations.map((location) => (
            <button
              className={activeLocation.name === location.name ? "active" : ""}
              key={location.name}
              onClick={() => setActiveLocation(location)}
              type="button"
            >
              <span>{location.name}</span>
              <small>{location.country}</small>
            </button>
          ))}
          </div>
        </div>

        <div className="map-frame">
          <iframe
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
            title={`${activeLocation.name} map`}
          />
          <div className="map-caption">
            <p className="eyebrow">Now viewing</p>
            <h3>{activeLocation.name}, {activeLocation.country}</h3>
            <p>{activeLocation.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorldMapSection;

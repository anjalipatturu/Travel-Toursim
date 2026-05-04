function Navbar({ onLogout }) {
  return (
    <nav className="topbar glass-nav">
      <a className="nav-brand" href="#home">
        <span className="brand-mark">TT</span>
        <span className="brand-copy">
          <span className="brand-name">Travel Tourism</span>
          <span className="brand-tagline">Explore beautifully</span>
        </span>
      </a>
      <div className="nav-links">
        <a href="#destinations">Destinations</a>
        <a href="#map">Map</a>
        <a href="#planner">AI Planner</a>
        <a href="#manage">Manage</a>
        <a href="#add-destination">Add</a>
      </div>
      <div className="nav-actions">
        <button type="button" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;

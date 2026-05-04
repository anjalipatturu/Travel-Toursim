import { useEffect, useState } from "react";

function HeroSlider({ slides }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      className="home-hero"
      id="home"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(7, 20, 24, .84), rgba(7, 20, 24, .28)), url(${slide.image})`,
      }}
    >
      <div className="hero-content">
        <p className="eyebrow">Live locations around the world</p>
        <h1>{slide.place}</h1>
        <p>{slide.line}</p>
        <div className="hero-stats">
          <span>{slide.country}</span>
        </div>
      </div>

     
    </section>
  );
}

export default HeroSlider;

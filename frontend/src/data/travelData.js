export const worldSlides = [
  {
    place: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1800&q=85",
    line: "White villages, blue domes, volcanic cliffs, and sunset sailing.",
  },
  {
    place: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85",
    line: "Temple lanes, tea houses, maple gardens, and quiet rail journeys.",
  },
  {
    place: "Machu Picchu",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1800&q=85",
    line: "Cloud forests, ancient stone routes, and Andes sunrise views.",
  },
  {
    place: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",
    line: "Glass trains, glacier paths, lake towns, and crisp alpine air.",
  },
];

export const famousCountries = [
  {
    name: "Italy",
    route: "Rome, Florence, Amalfi Coast",
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "France",
    route: "Paris, Provence, French Riviera",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Thailand",
    route: "Bangkok, Chiang Mai, Phuket",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "United Arab Emirates",
    route: "Dubai, Abu Dhabi, desert resorts",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80",
  },
];

export const mapLocations = [
  {
    name: "Santorini",
    country: "Greece",
    query: "Santorini Greece",
    description: "Caldera villages, cliff hotels, sunset viewpoints, and blue-domed churches.",
  },
  {
    name: "Kyoto",
    country: "Japan",
    query: "Kyoto Japan",
    description: "Temple districts, bamboo paths, tea houses, gardens, and traditional streets.",
  },
  {
    name: "Dubai",
    country: "United Arab Emirates",
    query: "Dubai UAE",
    description: "Skyline views, desert safaris, luxury shopping, beaches, and modern landmarks.",
  },
  {
    name: "Rome",
    country: "Italy",
    query: "Rome Italy",
    description: "Ancient ruins, piazzas, museums, fountains, cafes, and walkable history.",
  },
];

export const starterDestinations = [
  {
    _id: "sample-bali",
    name: "Bali Escape",
    location: "Indonesia",
    description: "Temple mornings, reef swims, waterfall trails, and rice terrace afternoons.",
    price: 799,
    rating: 4.8,
    images: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80"],
  },
  {
    _id: "sample-alps",
    name: "Alpine Rail Week",
    location: "Switzerland",
    description: "Scenic rail passes, lake towns, slow mountain lunches, and glacier viewpoints.",
    price: 1290,
    rating: 4.7,
    images: ["https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80"],
  },
];

export const emptyDestination = {
  name: "",
  location: "",
  description: "",
  price: "",
  rating: "",
  images: "",
};

export const fallbackTravelImage = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";

export const buildLocationImageUrl = (name = "", location = "") => {
  const query = [name, location, "travel"].filter(Boolean).join(",");
  const safeQuery = encodeURIComponent(query || "beautiful travel destination");

  return `https://loremflickr.com/900/700/${safeQuery}`;
};

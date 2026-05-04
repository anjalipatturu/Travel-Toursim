const getTripLength = (query) => {
  const match = query.match(/(\d+)\s*(day|days|night|nights)/i);
  return Math.min(Number(match?.[1] || 5), 14);
};

const getDestination = (query) => {
  const patterns = [
    /(?:in|to|for)\s+([a-zA-Z\s]+?)(?:\s+for|\s+with|\s+under|\s+on|\s+and|$)/i,
    /([a-zA-Z\s]+?)\s+(?:trip|tour|itinerary)/i,
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match?.[1]?.trim()) {
      return match[1].trim();
    }
  }

  return "your destination";
};

const getTravelStyle = (query) => {
  const lower = query.toLowerCase();

  if (lower.includes("luxury")) return "luxury";
  if (lower.includes("budget")) return "budget-friendly";
  if (lower.includes("family")) return "family-friendly";
  if (lower.includes("adventure")) return "adventure-focused";
  if (lower.includes("food")) return "food-focused";
  if (lower.includes("honeymoon")) return "romantic";

  return "balanced";
};

export const generateTripPlan = async (prompt = "") => {
  const query = prompt.trim();

  if (!query) {
    throw new Error("Please describe the trip you want to plan.");
  }

  const days = getTripLength(query);
  const destination = getDestination(query);
  const style = getTravelStyle(query);
  const dailyThemes = [
    "arrival, easy orientation, and a relaxed local dinner",
    "signature landmarks, walkable neighborhoods, and scenic viewpoints",
    "culture, museums, markets, and one memorable food stop",
    "nature, water, mountains, gardens, or a calm outdoor escape",
    "day trip, hidden gems, and a sunset experience",
    "shopping, cafes, local streets, and flexible free time",
    "slow morning, final highlights, and departure planning",
  ];

  const itinerary = Array.from({ length: days }, (_, index) => {
    const theme = dailyThemes[index % dailyThemes.length];
    return `Day ${index + 1}: Focus on ${theme}. Keep the morning structured, leave the afternoon flexible, and reserve dinner near your stay.`;
  });

  return [
    `Trip plan for ${destination}`,
    `Style: ${style}`,
    `Length: ${days} day${days > 1 ? "s" : ""}`,
    "",
    "Suggested itinerary:",
    ...itinerary,
    "",
    "Smart tips:",
    "- Book the first and last nights near your main transport point.",
    "- Keep one flexible block every two days for weather, rest, or discoveries.",
    "- Reserve popular attractions and long-distance transfers before arrival.",
    "- Carry a small daily cash buffer for local transport, snacks, and tips.",
  ].join("\n");
};

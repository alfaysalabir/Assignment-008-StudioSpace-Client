import { FiCamera, FiFilm, FiMic, FiMusic, FiPenTool } from "react-icons/fi";

// "value" is saved in MongoDB, "label" is shown on the Home page
export const categories = [
  { value: "Photo Studio", label: "Photo Studios", icon: FiCamera, text: "Cyc walls, daylight lofts and portrait sets." },
  { value: "Film Stage", label: "Sound Stages", icon: FiFilm, text: "Soundproof stages with lighting grids." },
  { value: "Podcast Lounge", label: "Podcast Rooms", icon: FiMic, text: "Treated rooms with pro microphones." },
  { value: "Music Suite", label: "Music Suites", icon: FiMusic, text: "Recording rooms with real gear." },
  { value: "Workshop", label: "Art Workshops", icon: FiPenTool, text: "Open spaces for making and teaching." },
];

export const categoryValues = categories.map((c) => c.value);

export const amenityOptions = [
  "Natural Light", "Cyc Wall", "Soundproofing", "Green Screen", "Lighting Kit",
  "Backdrops", "Wi-Fi", "Air Conditioning", "Mic & Mixer", "Studio Monitors",
  "Green Room", "Parking", "Kitchenette", "Changing Room",
];

// time options every 30 minutes (06:00 to 23:30)
export const timeOptions = Array.from({ length: 36 }, (_, i) => {
  const minutes = 6 * 60 + i * 30;
  const h = String(Math.floor(minutes / 60)).padStart(2, "0");
  const m = String(minutes % 60).padStart(2, "0");
  return `${h}:${m}`;
});

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;

export const heroSlides = [
  {
    image: img("photo-1492691527719-9d1e07e534b4"),
    eyebrow: "Rent by the hour",
    before: "Find the perfect",
    highlight: "studio",
    after: "for your next shoot",
    text: "From daylight cyc walls to cinema stages, book verified creative spaces with clear pricing and real availability.",
  },
  {
    image: img("photo-1598488035139-bdbb2231ce04"),
    eyebrow: "Sound that feels right",
    before: "Record, mix and",
    highlight: "create",
    after: "in treated rooms",
    text: "Podcast lounges and music suites with pro microphones, monitors and quiet walls are ready when you are.",
  },
  {
    image: img("photo-1513364776144-60967b0f800f"),
    eyebrow: "Earn from your space",
    before: "Turn your empty room into a",
    highlight: "creative hub",
    after: "",
    text: "List your studio in minutes, set your own hourly rate and welcome creators from your city.",
  },
];

export const bookingSteps = [
  { title: "Discover Spaces", text: "Search studios by category, city and price to find a room that fits your idea." },
  { title: "Select Shoot Hours", text: "Pick your date and time slot. Confirmed slots are shown so you never clash." },
  { title: "Book Instantly", text: "Send your request in one click. See the total price before you confirm." },
  { title: "Create & Produce", text: "Arrive, set up and create. Rate the space afterward to help other creators." },
];

export const guarantees = [
  { title: "Liability Protection", text: "Every confirmed booking is covered by clear house rules and a refundable security deposit." },
  { title: "Verified Profiles", text: "Hosts and creators sign in with a real account so you always know who you are working with." },
  { title: "Equipment Safety", text: "Hosts list their gear honestly, and reviews from past creators keep quality high." },
  { title: "24/7 Host Support", text: "Questions at midnight before a shoot? Our support team is here around the clock." },
];

export const faqs = [
  { q: "How do I book a studio?", a: "Open any studio, press Book Workspace Now, choose your date and hours, and send the request. The host will confirm it." },
  { q: "Can two people book the same time?", a: "No. Once a host confirms a booking, that time slot is blocked and new requests that overlap are rejected." },
  { q: "Can I cancel a booking?", a: "Yes. You can cancel any booking while it is still Pending from the My Bookings page." },
  { q: "How do I list my own studio?", a: "Create a free account, choose Add New Studio from your profile menu, and fill in the details. It goes live right away." },
  { q: "What is the security deposit?", a: "A refundable amount set by the host to protect their equipment. It is shown on every studio page." },
];

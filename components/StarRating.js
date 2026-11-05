import { FaStar } from "react-icons/fa6";

export default function StarRating({ value = 0, size = 16 }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <FaStar key={n} size={size} className={n <= Math.round(value) ? "text-amber-400" : "text-line"} />
      ))}
    </span>
  );
}

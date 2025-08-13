import { FaStar } from "react-icons/fa"

type StarRatingProps = {
    rating: number,
    outOf?: number,
    size?: number,
    className?: string,
    label?: string
  };
  
  const Star = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
        fill="currentColor"
      />
    </svg>
  );
  
  export function StarRating({
    rating,
    outOf = 5,
    size = 18,
    className = "",
    label,
  }: StarRatingProps) {
    const pct = Math.max(0, Math.min(1, rating / outOf)) * 100;
    const stars = Array.from({ length: outOf });
  
    return (
      <div
        className={`relative inline-block ${className}`}
        role="img"
        aria-label={label ?? `${rating.toFixed(1)} out of ${outOf} stars`}
        title={`${rating.toFixed(1)} / ${outOf}`}
      >
        {/* Base layer: gray stars */}
        <div className="flex gap-0.5 text-gray-300">
          {stars.map((_, i) => (
            <Star key={`bg-${i}`} size={size} />
          ))}
        </div>
  
        {/* Fill layer: yellow stars, clipped by width */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pct}%` }}
        >
          <div className="flex gap-0.5 text-yellow-400">
            {stars.map((_, i) => (
              <Star key={`fg-${i}`} size={size} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
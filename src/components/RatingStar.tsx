import { FaStar, FaRegStar } from "react-icons/fa"

type StarRatingProps = {
  rating: number,
  outOf?: number,
  size?: number,
  filledColor?: string,
  emptyColor?: string,
  showValue?: boolean,
  className?: string,
};

export default function RatingStar({
  rating,
  outOf = 5,
  size = 18,
  filledColor = "#F6C343",
  emptyColor = "#1F2937",
  showValue = false,
  className,
}: StarRatingProps) {
  // clamp to [0, outOf] and round to nearest 0.5
  const clamped = Math.max(0, Math.min(rating, outOf))
  const rounded = Math.round(clamped * 2) / 2
  const pct = Math.min(100, Math.max(0, (rounded / outOf) * 100))

  return (
    <div
      className={`inline-flex items-start ${className ?? ""}`}
      role="img"
      aria-label={`${rounded.toFixed(1)} out of ${outOf} stars`}
      title={`${rounded.toFixed(1)} / ${outOf}`}
    >
      <div style={{ position: "relative", lineHeight: 0 }}>
        {/* base (empty) stars */}
        <div style={{ display: "flex" }} aria-hidden="true">
          {Array.from({ length: outOf }).map((_, i) => (
            <FaRegStar key={`empty-${i}`} size={size} color={emptyColor} />
          ))}
        </div>

        {/* filled (yellow) stars clipped by width */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: `${pct}%`,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex" }}>
            {Array.from({ length: outOf }).map((_, i) => (
              <FaStar key={`filled-${i}`} size={size} color={filledColor} />
            ))}
          </div>
        </div>
      </div>

      {showValue && (
        <span className="font-bold text-sm ml-2">{rounded.toFixed(1)}</span>
      )}
    </div>
  );
}

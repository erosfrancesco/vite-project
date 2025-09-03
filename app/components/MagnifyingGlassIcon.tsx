type MagnifyingGlassIconProps = {
  className?: string;
};

const MagnifyingGlassIcon = ({ className }: MagnifyingGlassIconProps) => (
  <span
    className={`pointer-events-none text-[color:var(--shiatsu-gray)] text-[1.1em] ${className}`}
    style={{
      // position: "absolute",
      left: 10,
      // top: "50%",
      // transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--shiatsu-gray)",
      fontSize: "1.1em",
    }}
  >
    {/* Magnifying glass SVG */}
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
      <line
        x1="15"
        y1="15"
        x2="19"
        y2="19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export default MagnifyingGlassIcon;

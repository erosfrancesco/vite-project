type PlusIconProps = {
  className?: string;
};

const PlusIcon = ({ className }: PlusIconProps) => (
  <span
    className={className}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2em",
      cursor: "pointer",
    }}
  >
    {/* Plus (+) SVG */}
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line
        x1="10"
        y1="5"
        x2="10"
        y2="15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="5"
        y1="10"
        x2="15"
        y2="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </span>
);

export default PlusIcon;

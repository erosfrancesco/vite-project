type DeleteIconProps = {
  className?: string;
};

const DeleteIcon = ({ className }: DeleteIconProps) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 20 20"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="5"
      y="3"
      width="10"
      height="13"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M3 7h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 10v3M12 10v3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default DeleteIcon;

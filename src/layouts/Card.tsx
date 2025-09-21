export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "shadow hover:shadow-lg rounded transition-shadow",
        "border p-4 rounded cursor-pointer",
        "hover:bg-[color:var(--shiatsu-secondary)] hover:text-[var(--shiatsu-text)]",
      ].join(" ")}
    >
      {children}
    </div>
  );
}

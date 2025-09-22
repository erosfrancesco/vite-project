export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="card">{children}</div>;
}

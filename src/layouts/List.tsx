export default function ListLayout({
  header,
  children,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <main className="min-h-[100vh]">
      <header className="flex gap-2 mb-4 w-full">{header}</header>
      <div className="p-4">{children}</div>
    </main>
  );
}

export default function ListLayout({
  header,
  children,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <main className="min-h-[100vh]">
      <div className="p-4">
        <header className="flex gap-2 mb-4">{header}</header>

        {children}
      </div>
    </main>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        {children}
      </div>
    </main>
  );
}

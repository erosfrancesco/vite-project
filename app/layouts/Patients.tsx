type PatientsProps = {
  header: React.ReactNode;
  filters: React.ReactNode;
  main: React.ReactNode;
};

export default function PatientsLayout({
  header,
  filters,
  main,
}: PatientsProps) {
  return (
    <main className="min-h-[100vh]">
      <div className="p-4">
        <header className="flex gap-2 mb-4">{header}</header>
        <div className="flex flex-col gap-4">
          {filters}
          {main}
        </div>
      </div>
    </main>
  );
}

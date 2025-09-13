type TreatmentsProps = {
  header: React.ReactNode;
  filters: React.ReactNode;
  main: React.ReactNode;
};

export default function TreatmentsLayout({
  header,
  filters,
  main,
}: TreatmentsProps) {
  return (
    <main className="min-h-[100vh]">
      <div className="p-4">
        <header className="flex gap-2 mb-4">{header}</header>

        {filters}
        {main}
      </div>
    </main>
  );
}

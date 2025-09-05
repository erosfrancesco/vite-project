export default function BottomBar({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <footer className="flex w-full fixed bottom-0">
      <div
        className={[
          "z-1 flex w-full justify-center items-center",
          className,
        ].join(" ")}
      >
        {children}
      </div>

      <div className="absolute overflow-hidden bottom-0 left-0 w-full h-10 mt-0">
        <div className="absolute z-1 left-[calc(50%-theme(spacing.7))] rounded-full h-14 w-14 bg-[color:var(--shiatsu-primary)] shadow-lg" />

        <div className="absolute z-0 left-0 bottom-0 h-4 w-full bg-[color:var(--shiatsu-primary-bg)]" />
        <div className="absolute flex bottom-0 left-0 w-full h-[75%] overflow-hidden float-start">
          <div className="bg-[color:var(--shiatsu-primary-bg)] mt-2.5 ml-[calc(50%-theme(spacing.40))] w-40 h-14 -skew-3 skew-x-50" />
          <div className="bg-[color:var(--shiatsu-primary-bg)] mt-2 ml-[-theme(spacing.7)] w-40 h-14 skew-5" />
        </div>
      </div>
    </footer>
  );
}

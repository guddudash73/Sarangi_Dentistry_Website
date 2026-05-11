type PageBackgroundProps = {
  withSketch?: boolean;
};

export default function PageBackground({
  withSketch = false,
}: PageBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 ${withSketch ? "overflow-hidden" : ""}`}
    >
      {/* Base Background */}
      <div className="absolute inset-0 bg-background" />

      {withSketch ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/assets/sketch_it_sarangi.png')",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
          Uniform Shuttle Tint & Gradients (Maintained for cohesion in Hero)
          <div className="absolute inset-0 bg-[rgba(255,255,255,0.5)]" />
          {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(var(--accent-soft-rgb),0.3),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(var(--accent-soft-rgb),0.12),transparent_28%),radial-gradient(circle_at_50%_75%,rgba(36,68,58,0.04),transparent_32%)]" /> */}
          {/* <div className="absolute inset-0 bg-linear-to-b from-[rgba(255,255,255,0.18)] via-[rgba(248,255,250,0.10)] to-[rgba(248,255,250,0.26)]" /> */}
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 65%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 65%, transparent 100%)",
          }}
        >
          {/* Faded Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--accent-soft-rgb),0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--accent-soft-rgb),0.2)_1px,transparent_1px)] bg-[size:100px_100px] opacity-70" />

          {/* Soft Vector Blobs */}
          {/* <div className="absolute -left-[10%] -top-[10%] h-[50vw] w-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-accent-soft/20 blur-[140px]" /> */}
          {/* <div className="absolute -right-[5%] top-[20%] h-[40vw] w-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-primary/10 blur-[150px]" /> */}
          {/* <div className="absolute bottom-[0%] left-[20%] h-[45vw] w-[45vw] max-w-[700px] max-h-[700px] rounded-full bg-primary-hover/10 blur-[140px]" /> */}
        </div>
      )}
    </div>
  );
}

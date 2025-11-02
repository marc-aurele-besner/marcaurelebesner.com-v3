export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Cyberpunk vignette with neon glow */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,243,255,0.15),transparent_60%),radial-gradient(60%_40%_at_20%_80%,rgba(255,0,255,0.12),transparent_60%),radial-gradient(60%_40%_at_80%_20%,rgba(255,255,0,0.08),transparent_60%)]" />

      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      {/* Enhanced neon blobs */}
      <div className="absolute -top-40 -left-28 h-[28rem] w-[28rem] rounded-full bg-[var(--accent)]/20 blur-3xl neon-pulse" />
      <div className="absolute -bottom-48 -right-32 h-[28rem] w-[28rem] rounded-full bg-[var(--accent-secondary)]/15 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[20rem] w-[20rem] rounded-full bg-[var(--accent-tertiary)]/10 blur-3xl" />

      {/* Data streams */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="data-stream"
          style={{
            left: `${10 + i * 12}%`,
            animationDelay: `${i * 0.4}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
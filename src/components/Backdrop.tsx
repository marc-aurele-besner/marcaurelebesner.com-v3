export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden cyber-scanlines">
      {/* Cyberpunk grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 dark:opacity-20" />

      {/* Enhanced neon vignette with multiple colors */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(0,255,255,0.12),transparent_60%),radial-gradient(60%_40%_at_20%_80%,rgba(157,0,255,0.08),transparent_60%),radial-gradient(60%_40%_at_80%_20%,rgba(255,0,255,0.08),transparent_60%)]" />

      {/* Cyberpunk neon blobs with multiple colors */}
      <div className="absolute -top-40 -left-28 h-[28rem] w-[28rem] rounded-full bg-[#00ffff] blur-3xl opacity-20 dark:opacity-30 animate-pulse" />
      <div className="absolute -bottom-48 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#9d00ff] blur-3xl opacity-20 dark:opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[32rem] w-[32rem] rounded-full bg-[#ff00ff] blur-3xl opacity-10 dark:opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Additional accent grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] dark:opacity-40" />
    </div>
  );
}
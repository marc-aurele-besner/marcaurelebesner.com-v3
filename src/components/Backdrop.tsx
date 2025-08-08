export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(100,255,218,0.08),transparent_60%),radial-gradient(60%_40%_at_20%_80%,rgba(100,255,218,0.06),transparent_60%),radial-gradient(60%_40%_at_80%_20%,rgba(100,255,218,0.06),transparent_60%)]" />

      {/* Fine grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

      {/* Accent blobs */}
      <div className="absolute -top-40 -left-28 h-[28rem] w-[28rem] rounded-full bg-lightCyan/10 blur-3xl" />
      <div className="absolute -bottom-48 -right-32 h-[28rem] w-[28rem] rounded-full bg-lightCyan/10 blur-3xl" />
    </div>
  );
}
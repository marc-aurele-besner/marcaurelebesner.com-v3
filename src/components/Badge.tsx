export default function Badge({ text }: { text: string }) {
  return (
    <span className="px-2 py-1 mt-2 rounded-full text-sm border border-[var(--accent)]/50 text-[var(--accent)] bg-[var(--accent-bg-weak)] backdrop-blur-sm shadow-[0_0_10px_rgba(0,243,255,0.2),inset_0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.4),inset_0_0_15px_rgba(0,243,255,0.15)] hover:bg-[var(--accent-bg-weak)] transition-all neon-text">
      {text}
    </span>
  );
}

export default function Badge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--border-strong)] text-[var(--accent)] bg-[var(--surface)]/50 backdrop-blur-sm transition-all duration-300 hover:bg-[var(--accent-bg-weak)] hover:border-[var(--accent)] hover:shadow-lg hover:shadow-[var(--accent)]/20 hover:-translate-y-0.5 cursor-default">
      {text}
    </span>
  );
}

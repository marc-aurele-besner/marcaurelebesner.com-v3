export default function Badge({ text }: { text: string }) {
  return (
    <span className="px-3 py-1.5 rounded-full text-sm font-medium border border-[var(--accent-weak)] text-[var(--accent)] bg-black/5 dark:bg-white/5 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(100,255,218,0.15)] hover:shadow-[0_0_16px_rgba(100,255,218,0.3)] hover:bg-[var(--accent-bg-weak)] hover:border-[var(--accent)] hover:scale-105 transition-all duration-200">
      {text}
    </span>
  );
}

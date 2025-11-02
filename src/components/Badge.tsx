export default function Badge({ text }: { text: string }) {
  return (
    <span className="px-2 py-1 mt-2 rounded-full text-sm border border-[var(--accent-weak)] dark:border-[var(--cyber-cyan)]/50 text-[var(--accent)] dark:text-[var(--cyber-cyan)] bg-black/5 dark:bg-white/5 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(0,255,255,0.15)] hover:shadow-[0_0_24px_rgba(0,255,255,0.4)] dark:hover:shadow-[0_0_24px_rgba(0,255,255,0.5)] hover:bg-[var(--accent-bg-weak)] dark:hover:bg-[var(--cyber-cyan)]/10 transition-all duration-300 hover:scale-105 font-medium">
      {text}
    </span>
  );
}

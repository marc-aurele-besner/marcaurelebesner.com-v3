export default function Badge({ text }: { text: string }) {
  return (
    <span className="px-2 py-1 mt-2 rounded-full text-sm border border-lightCyan/40 text-lightCyan bg-white/5 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(100,255,218,0.15)] hover:shadow-[0_0_24px_rgba(100,255,218,0.25)] hover:bg-lightCyan/10 transition-all">
      {text}
    </span>
  );
}

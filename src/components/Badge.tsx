export default function Badge({ text }: { text: string }) {
  return (
    <span className="px-2 py-1 mt-2 rounded-full text-sm border border-lightCyan/40 text-lightCyan bg-transparent hover:bg-lightCyan/10 transition-colors">
      {text}
    </span>
  );
}

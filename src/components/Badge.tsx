export default function Badge({ text }: { text: string }) {
  return (
    <span className="bg-lightCyan text-darkBlue px-2 py-1 rounded-full text-sm">
      {text}
    </span>
  );
}

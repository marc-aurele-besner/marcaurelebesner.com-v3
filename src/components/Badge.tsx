export default function Badge({ text }: { text: string }) {
  return (
    <span className="group/badge relative px-3 py-1.5 mt-2 rounded text-xs font-mono font-semibold border border-cyber-blue/40 text-cyber-blue dark:text-cyber-blue bg-black/5 dark:bg-cyber-dark/60 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(0,217,255,0.2)] hover:shadow-[0_0_20px_rgba(0,217,255,0.4),inset_0_0_20px_rgba(0,217,255,0.1)] hover:bg-cyber-blue/10 hover:border-cyber-blue/60 transition-all duration-300 uppercase tracking-wider overflow-hidden">
      {/* Animated background shimmer */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyber-blue/10 to-transparent opacity-0 group-hover/badge:opacity-100 group-hover/badge:animate-[shimmer_1.5s_ease-in-out_infinite] -translate-x-full" />
      
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-1 h-1 bg-cyber-blue opacity-50 group-hover/badge:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 right-0 w-1 h-1 bg-cyber-pink opacity-50 group-hover/badge:opacity-100 transition-opacity" />
      
      <span className="relative z-10">{text}</span>
    </span>
  );
}

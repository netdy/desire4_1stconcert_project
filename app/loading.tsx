export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0d0d0d] z-[9999] flex flex-col items-center justify-center">
      {/* Premium Gradient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#ef4444]/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700"></div>

      <div className="relative flex flex-col items-center">
        {/* Animated Spinner */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-2 border-transparent border-t-accent border-r-accent/30 rounded-full animate-spin"></div>
          {/* Inner Ring (Reverse Spin) */}
          <div className="absolute inset-3 border-2 border-transparent border-b-[#ef4444] border-l-[#ef4444]/30 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
          {/* Center Glow */}
          <div className="absolute inset-0 m-auto w-2 h-2 bg-accent rounded-full shadow-[0_0_15px_#d4af37]"></div>
        </div>

        {/* Text Loading */}
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-white font-serif text-2xl font-bold tracking-[0.3em] uppercase opacity-80 animate-pulse">
            DESIRE4
          </h2>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
          </div>
        </div>
      </div>

      {/* Decorative border or something */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center">
        <p className="text-[#333] text-[10px] uppercase tracking-[0.5em] font-medium">
          Loading support project...
        </p>
      </div>
    </div>
  );
}

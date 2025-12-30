import React from "react";

export default function GlobalLoader() {
  return (
    // Container a schermo intero con z-index altissimo per stare sopra a tutto
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-300">
      {/* Animazione Spinner Custom */}
      <div className="relative w-16 h-16">
        {/* Cerchio esterno che gira */}
        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
        {/* Cerchio interno colorato che gira */}
        <div className="absolute inset-0 border-4 border-[#bdd7fa] border-t-blue-600 rounded-full animate-spin"></div>
      </div>

      {/* Testo opzionale */}
      <p className="mt-4 text-slate-500 font-mono text-sm uppercase tracking-widest animate-pulse">Caricamento...</p>
    </div>
  );
}

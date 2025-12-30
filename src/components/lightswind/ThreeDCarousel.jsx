import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const ThreeDCarousel = ({ modules }) => {
  // Configurazione del carosello
  const cardWidth = 280; // Larghezza approssimativa card
  const cardCount = modules.length;
  // Calcolo del raggio necessario affinché le card non si sovrappongano troppo
  // Formula: r = (w / 2) / tan(PI / n)
  const radius = Math.round(cardWidth / 2 / Math.tan(Math.PI / cardCount)) + 50;

  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden perspective-1000">
      {/* Contenitore Rotante (Il Cilindro) */}
      <motion.div
        className="relative w-[280px] h-[200px]"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: isPaused ? null : 360, // Ruota se non è in pausa
        }}
        transition={{
          rotateY: {
            duration: 25, // Velocità (più alto = più lento)
            ease: "linear",
            repeat: Infinity,
          },
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {modules.map((module, index) => {
          // Calcola l'angolo per questa specifica card
          const angle = (360 / cardCount) * index;

          return (
            <div
              key={module.id}
              className="absolute top-0 left-0 w-full h-full backface-visible"
              style={{
                // 1. Ruota la card al suo angolo
                // 2. Spingila in fuori del raggio (translateZ)
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
            >
              <CarouselCard module={module} />
            </div>
          );
        })}
      </motion.div>

      {/* Sfumatura laterale per dare profondità (Opzionale) */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
};

// La singola Card del Carosello
const CarouselCard = ({ module }) => {
  return (
    <motion.div
      // Zoom e hover effect gestiti qui
      whileHover={{
        scale: 1.15,
        borderColor: "#bdd7fa",
        boxShadow: "0 0 20px rgba(189, 215, 250, 0.4)",
      }}
      transition={{ duration: 0.3 }}
      className="h-full w-full bg-white border border-slate-200 p-6 flex flex-col justify-between rounded-none shadow-lg cursor-pointer group select-none"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-slate-50 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors rounded-none border border-slate-100">
            {module.icon}
          </div>
          <span className="text-[10px] font-mono text-slate-400 border border-slate-100 px-1 py-0.5 bg-slate-50">
            {module.date}
          </span>
        </div>

        <h4 className="text-lg font-bold text-slate-800 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
          {module.title}
        </h4>
        <p className="text-[10px] text-slate-500 uppercase tracking-wider">Epicode Module</p>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <a
          href={module.fileLink}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-bold text-slate-600 group-hover:text-blue-600 flex items-center gap-2 !no-underline"
          // Impediamo la propagazione del click se stiamo draggando (opzionale)
          onClick={(e) => e.stopPropagation()}
        >
          <FileText className="w-4 h-4" /> Vedi Attestato
        </a>
      </div>
    </motion.div>
  );
};

export default ThreeDCarousel;

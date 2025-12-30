import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

export const ThreeDHoverGallery = ({ images, className = "" }) => {
  const ref = useRef(null);

  // Valori del mouse normalizzati tra -1 e 1
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring per rendere il movimento fluido e "gommoso"
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function onMouseMove(event) {
    const { clientX, clientY } = event;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();

    // Calcoliamo la posizione normalizzata (-1 = sinistra/alto, 1 = destra/basso)
    // Non dividiamo più per 20, usiamo l'intervallo completo
    const xPos = (clientX - (left + width / 2)) / (width / 2);
    const yPos = (clientY - (top + height / 2)) / (height / 2);

    x.set(xPos);
    y.set(yPos);
  }

  function onMouseLeave() {
    // Quando il mouse esce, torna al centro dolcemente
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      // perspective-1000 è essenziale per l'effetto 3D
      className={`relative h-[450px] w-full flex items-center justify-center cursor-pointer perspective-1000 ${className}`}
    >
      {images.map((img, index) => (
        <ImageCard key={index} src={img} index={index} total={images.length} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};

const ImageCard = ({ src, index, total, mouseX, mouseY }) => {
  // Calcolo dell'offset (es. se sono 3 img: -1, 0, 1)
  const offset = index - (total - 1) / 2;

  // --- LA MAGIA DELLO SCORRIMENTO ---

  // 1. Spostamento laterale (Translate X)
  // Più l'immagine è "lontana" dal centro (offset), più si muove.
  // Questo crea l'effetto "Parallax" o scorrimento.
  const translateX = useTransform(mouseX, (val) => {
    // Posizione base (apertura a ventaglio) + Movimento del mouse amplificato
    return offset * 70 + val * offset * 50;
  });

  // 2. Rotazione Y (Sull'asse verticale)
  // Le immagini ruotano verso il mouse
  const rotateY = useTransform(mouseX, (val) => val * 25);

  // 3. Rotazione X (Sull'asse orizzontale)
  const rotateX = useTransform(mouseY, (val) => val * -15);

  // 4. Scala e Profondità (Z)
  // L'immagine centrale sta davanti, le altre dietro
  const z = useTransform(mouseX, (val) => {
    // Un po' di matematica per far avanzare quella verso cui punto
    return Math.abs(offset) * -50 + val * offset * 20;
  });

  // Z-index statico per l'ordine di impilamento
  const zIndex = total - Math.abs(offset);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        x: translateX,
        z: z, // Framer Motion gestisce translateZ così
        zIndex,
      }}
      // Aggiunto whileHover sulla singola card per farla "poppare"
      whileHover={{ scale: 1.1, zIndex: 100 }}
      transition={{ duration: 0.2 }}
      className="absolute w-52 h-72 md:w-64 md:h-80 rounded-none shadow-xl overflow-hidden border-[6px] border-white bg-slate-200"
    >
      <img src={src} alt={`Gallery image ${index + 1}`} className="h-full w-full object-cover pointer-events-none" />

      {/* Riflesso lucido (Glossy effect) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 mix-blend-overlay pointer-events-none" />
    </motion.div>
  );
};

export default ThreeDHoverGallery;

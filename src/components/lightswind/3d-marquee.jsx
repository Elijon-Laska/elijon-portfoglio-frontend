import { motion } from "framer-motion";
import React from "react";

export const ThreeDMarquee = ({ images, className = "", cols = 4, onImageClick }) => {
  const duplicatedImages = [...images, ...images];

  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  // Questa funzione è definita qui nel padre
  const handleImageClick = (image, globalIndex) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    }
  };

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden w-full ${className}`}>
      {imageGroups.map((imagesInGroup, idx) => (
        <MarqueeGroup
          key={idx}
          imagesInGroup={imagesInGroup}
          idx={idx}
          groupSize={groupSize}
          // Passiamo la funzione al figlio tramite la prop 'onImageClick'
          onImageClick={handleImageClick}
        />
      ))}
    </div>
  );
};

const MarqueeGroup = ({ imagesInGroup, idx, groupSize, onImageClick }) => {
  return (
    <div className="h-full overflow-hidden relative">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: `-${100}%` }}
        transition={{
          duration: 20 + idx * 5,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="flex flex-col items-center gap-6 pb-6"
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[1px] bg-[#bdd7fa]/50" />

        {imagesInGroup.map((image, imgIdx) => {
          const globalIndex = idx * groupSize + imgIdx;
          const isClickable = image.href || onImageClick;

          return (
            <div key={`img-${imgIdx}`} className="relative z-0 p-2">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5, zIndex: 10 }}
                transition={{ duration: 0.2 }}
                className={`
                  bg-white rounded-2xl shadow-sm border border-[#bdd7fa]/30 p-4 w-24 h-24 flex items-center justify-center
                  ${isClickable ? "cursor-pointer hover:shadow-lg hover:border-[#bdd7fa]" : ""}
                `}
                // CORREZIONE QUI: Usiamo 'onImageClick' (la prop) invece di 'handleImageClick'
                onClick={() => onImageClick(image, globalIndex)}
              >
                <img src={image.src} alt={image.alt} className="w-full h-full object-contain" />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ThreeDMarquee;

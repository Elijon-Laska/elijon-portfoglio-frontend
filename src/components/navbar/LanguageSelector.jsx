import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../redux/slices/uiSlice";
import { useTranslation } from "react-i18next";

export default function LanguageSelector({ isScrolled }) {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.ui);
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  return (
    <div
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-none transition-all duration-500 border
        ${
          isScrolled
            ? /* STATO SCROLLED: Sfondo bianco semi-opaco, effetto vetro forte, ombra */
              "bg-white/80 backdrop-blur-md border-white/50 shadow-md"
            : /* STATO TOP (Default): Sfondo quasi trasparente, molto leggero */
              "bg-white/30 backdrop-blur-sm border-slate-200/60 hover:bg-white/80"
        }
      `}
    >
      {/* BANDIERA ITALIANA */}
      <button
        onClick={() => changeLang("it")}
        title="Italiano"
        className={`
          transition-all duration-300 transform hover:scale-110 flex items-center justify-center
          ${
            language === "it"
              ? "opacity-100 scale-110 grayscale-0 filter-none"
              : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
          }
        `}
      >
        <img
          src="https://flagcdn.com/w40/it.png"
          srcSet="https://flagcdn.com/w80/it.png 2x"
          width="24"
          height="18"
          alt="Italiano"
          className="rounded-none object-cover shadow-sm"
        />
      </button>

      {/* SEPARATORE VERTICALE */}
      <div
        className={`w-px h-4 mx-1 transition-colors duration-300 ${isScrolled ? "bg-slate-400/50" : "bg-slate-400/30"}`}
      ></div>

      {/* BANDIERA INGLESE */}
      <button
        onClick={() => changeLang("en")}
        title="English"
        className={`
          transition-all duration-300 transform hover:scale-110 flex items-center justify-center
          ${
            language === "en"
              ? "opacity-100 scale-110 grayscale-0 filter-none"
              : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
          }
        `}
      >
        <img
          src="https://flagcdn.com/w40/gb.png"
          srcSet="https://flagcdn.com/w80/gb.png 2x"
          width="24"
          height="18"
          alt="English"
          className="rounded-none object-cover shadow-sm"
        />
      </button>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, setLanguage } from "../../redux/slices/uiSlice";
import { useTranslation } from "react-i18next";
import { Settings, Moon, Sun, Languages, Check, ChevronRight } from "lucide-react";

export default function SettingsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Redux & i18n
  const { theme, language } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();

  // Chiudi il menu se clicco fuori
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Gestione Cambio Lingua
  const changeLang = (lang) => {
    dispatch(setLanguage(lang)); // Aggiorna Redux
    i18n.changeLanguage(lang); // Aggiorna la libreria i18n
    // Non chiudiamo il menu subito per permettere all'utente di vedere il cambio
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      {/* BOTTONE TRIGGER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-2.5 rounded-xl transition-all duration-300 border
          ${
            isOpen
              ? "bg-blue-100 text-blue-600 border-blue-200 dark:bg-slate-800 dark:text-blue-400 dark:border-slate-700"
              : "bg-white text-slate-600 border-transparent hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          }
        `}
        aria-label="Impostazioni"
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <Settings className="w-5 h-5" />
        </motion.div>
      </button>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5"
          >
            {/* Header del Menu */}
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {t("settings.preferences", "Preferenze")}
              </span>
            </div>

            <div className="p-2 space-y-1">
              {/* --- SEZIONE TEMA --- */}
              <div className="px-3 py-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                    {theme === "dark" ? (
                      <Moon className="w-4 h-4 text-purple-500" />
                    ) : (
                      <Sun className="w-4 h-4 text-amber-500" />
                    )}
                    <span>{t("settings.theme", "Tema")}</span>
                  </div>
                  <span className="text-xs text-slate-400 capitalize">
                    {theme === "light" ? t("settings.light", "Chiaro") : t("settings.dark", "Scuro")}
                  </span>
                </div>

                <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex relative">
                  {/* Sfondo animato dello switch */}
                  <motion.div
                    layout
                    className="absolute top-1 bottom-1 bg-white dark:bg-slate-700 rounded-lg shadow-sm"
                    initial={false}
                    animate={{
                      x: theme === "light" ? 0 : "100%",
                      width: "50%",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />

                  <button
                    onClick={() => dispatch(toggleTheme())}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      theme === "light" ? "text-slate-800" : "text-slate-500 hover:text-slate-700 dark:text-slate-400"
                    }`}
                  >
                    <Sun className="w-4 h-4" /> Light
                  </button>
                  <button
                    onClick={() => dispatch(toggleTheme())}
                    className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      theme === "dark" ? "text-slate-100" : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    <Moon className="w-4 h-4" /> Dark
                  </button>
                </div>
              </div>

              <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-3" />

              {/* --- SEZIONE LINGUA --- */}
              <div className="px-3 py-2">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium mb-3">
                  <Languages className="w-4 h-4 text-blue-500" />
                  <span>{t("settings.language", "Lingua")}</span>
                </div>

                <div className="space-y-1">
                  <LanguageOption
                    lang="it"
                    label="Italiano"
                    flag="🇮🇹"
                    current={language}
                    onClick={() => changeLang("it")}
                  />
                  <LanguageOption
                    lang="en"
                    label="English"
                    flag="🇬🇧"
                    current={language}
                    onClick={() => changeLang("en")}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sotto-componente per le opzioni lingua
function LanguageOption({ lang, label, flag, current, onClick }) {
  const isSelected = current === lang;

  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all
        ${
          isSelected
            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{flag}</span>
        <span className="font-medium">{label}</span>
      </div>
      {isSelected && <Check className="w-4 h-4" />}
    </button>
  );
}

import { createSlice } from "@reduxjs/toolkit";

// Funzione per capire se l'utente preferisce il tema scuro o ha salvato una preferenza
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    // 1. Controlla se c'è salvato nel localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    // 2. Altrimenti controlla le preferenze di sistema del computer
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  }
  return "light"; // Default
};

const initialState = {
  // Stati dei Modali
  isOpen: false,
  view: "quote",
  data: null,

  // Stati per Tema e Lingua (NUOVI)
  theme: getInitialTheme(),
  language: "it",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // --- GESTIONE MODALI ---
    openModal: (state, action) => {
      state.isOpen = true;
      state.view = action.payload?.view || "quote";
      state.data = action.payload?.data || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.data = null;
      state.view = "quote";
    },

    // --- GESTIONE TEMA (Quelli che mancavano) ---
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);

      // Aggiorna il DOM
      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", state.theme);

      if (state.theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    // --- GESTIONE LINGUA (Quello che mancava) ---
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

// ESPORTA TUTTE LE AZIONI (Fondamentale!)
export const { openModal, closeModal, toggleTheme, setTheme, setLanguage } = uiSlice.actions;

export default uiSlice.reducer;

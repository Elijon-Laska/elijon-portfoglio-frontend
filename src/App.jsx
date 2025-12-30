import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarComponents from "./components/navbar/NavbarComponents";
import Footer from "./components/footer/Footer";
import ScrollToTop from "./components/ScrollToTop";
import GoUp from "./components/GoUp";

// 1. RIMUOVI GLI IMPORT STATICI (Quelli che causavano l'errore)
// import Home from "./components/Home";  <-- CANCELLA QUESTO
// import ChiSono from ...                <-- CANCELLA QUESTO ecc.

// 2. IMPORTA SUSPENSE E LAZY
import { Suspense, lazy } from "react";

// MODALE GLOBALE E LOADER
import GlobalModal from "./components/GlobalModal";
import GlobalLoader from "./components/GlobalLoader";

// 3. DEFINIZIONI LAZY (TIENI SOLO QUESTE)
const Home = lazy(() => import("./components/Home"));
const ChiSono = lazy(() => import("./components/chiSono/ChiSono"));
const Competenze = lazy(() => import("./components/competenze/Competenze"));
const Certificazioni = lazy(() => import("./components/certificazioni/Certificazioni"));
const Servizi = lazy(() => import("./components/servizi/Servizi"));
const Contattami = lazy(() => import("./components/contattami/Contattami"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavbarComponents />
      <GoUp />

      {/* IL MODALE VIVE QUI, SOPRA TUTTO */}
      <GlobalModal />

      {/* SUSPENSE GESTISCE IL CARICAMENTO */}
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Chi-Sono" element={<ChiSono />} />
          <Route path="/Competenze" element={<Competenze />} />
          <Route path="/Certificazioni" element={<Certificazioni />} />
          <Route path="/Servizi" element={<Servizi />} />
          <Route path="/Contattami" element={<Contattami />} />
        </Routes>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

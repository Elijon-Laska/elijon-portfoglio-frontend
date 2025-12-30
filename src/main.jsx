import { createRoot } from "react-dom/client";
import "./i18n";

// 1. PRIMA: Bootstrap (CSS Base + Icone)
// Vite gestirà questi import in modo parallelo e ottimizzato
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Spostato qui da index.css

// 2. POI: Lightswind (Componenti pronti)
import "./lightswind.css";

// 3. INFINE: Il tuo Index con Tailwind
// (Deve essere ultimo per poter sovrascrivere tutto con classi tipo 'mt-10', '!bg-red-500')
import "./index.css";

import App from "./App.jsx";
import store from "./redux/store/index.js";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>
);

import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slices/uiSlice"; // Importa azione
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Send, UserPlus, Briefcase } from "lucide-react";

export default function HomeActions() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="flex flex-row gap-3 w-full mt-0 p-0 relative z-10 justify-center">
      <div className="flex-1">
        <ActionButton
          variant="primary"
          // Apre il modale in modalità PREVENTIVO (default)
          onClick={() => dispatch(openModal({ view: "quote" }))}
          icon={<Send className="w-4 h-4" />}
        >
          <span className="hidden sm:inline">{t("home.actions.quote")}</span>
        </ActionButton>
      </div>
      <div className="flex-1">
        <ActionButton
          variant="outline"
          // Apre il modale in modalità COLLABORA (Wizard)
          onClick={() => dispatch(openModal({ view: "collaborate" }))}
          icon={<UserPlus className="w-4 h-4" />}
        >
          {t("home.actions.collaborate")}
        </ActionButton>
      </div>
      <div>
        <ActionButton variant="ghost" onClick={() => navigate("/Servizi")} icon={<Briefcase className="w-4 h-4" />}>
          <span className="hidden sm:inline">{t("home.actions.services")}</span>
        </ActionButton>
      </div>
    </div>
  );
}

function ActionButton({ children, onClick, variant, icon }) {
  const baseStyle =
    "w-full py-3 px-4 text-sm md:text-base rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg active:scale-95 whitespace-nowrap";
  const variants = {
    primary: "bg-blue-600 text-white shadow-blue-500/30 hover:bg-blue-500 hover:shadow-blue-500/50",
    outline: "bg-white border-2 border-blue-100 text-slate-700 hover:border-blue-400 hover:text-blue-600",
    ghost: "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800",
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
      {icon} {children}
    </button>
  );
}

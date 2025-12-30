import SEO from "../SEO";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // 1. IMPORT
import ElectroBorder from "../lightswind/electro-border.jsx";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/uiSlice";

import {
  Monitor,
  Server,
  Layers,
  Bot,
  AppWindow,
  Handshake,
  Cpu,
  Search,
  PenTool,
  Wrench,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function Servizi() {
  const dispatch = useDispatch();
  const { t } = useTranslation(); // 2. HOOK

  // 3. DATI DENTRO IL COMPONENTE
  const services = [
    {
      id: "frontend",
      title: t("services.list.frontend.title"),
      desc: t("services.list.frontend.desc"),
      icon: <Monitor className="w-8 h-8" />,
      tags: ["React", "Tailwind", "Responsive"],
    },
    {
      id: "backend",
      title: t("services.list.backend.title"),
      desc: t("services.list.backend.desc"),
      icon: <Server className="w-8 h-8" />,
      tags: ["Node.js", "SQL/NoSQL", "API REST"],
    },
    {
      id: "fullstack",
      title: t("services.list.fullstack.title"),
      desc: t("services.list.fullstack.desc"),
      icon: <Layers className="w-8 h-8" />,
      tags: ["End-to-End", "Deploy", "Performance"],
    },
    {
      id: "chatbot",
      title: t("services.list.chatbot.title"),
      desc: t("services.list.chatbot.desc"),
      icon: <Bot className="w-8 h-8" />,
      tags: ["Automation", "AI", "Telegram"],
    },
    {
      id: "webapp",
      title: t("services.list.webapp.title"),
      desc: t("services.list.webapp.desc"),
      icon: <AppWindow className="w-8 h-8" />,
      tags: ["SPA", "Real-time", "Dashboard"],
    },
    {
      id: "consulting",
      title: t("services.list.consulting.title"),
      desc: t("services.list.consulting.desc"),
      icon: <Handshake className="w-8 h-8" />,
      tags: ["Code Review", "Strategy", "Mentoring"],
    },
    {
      id: "ai",
      title: t("services.list.ai.title"),
      desc: t("services.list.ai.desc"),
      icon: <Cpu className="w-8 h-8" />,
      tags: ["OpenAI", "LLM", "Smart Apps"],
    },
    {
      id: "seo",
      title: t("services.list.seo.title"),
      desc: t("services.list.seo.desc"),
      icon: <Search className="w-8 h-8" />,
      tags: ["Performance", "Ranking", "Speed"],
    },
    {
      id: "uiux",
      title: t("services.list.uiux.title"),
      desc: t("services.list.uiux.desc"),
      icon: <PenTool className="w-8 h-8" />,
      tags: ["Figma", "Wireframe", "User Flow"],
    },
    {
      id: "maintenance",
      title: t("services.list.maintenance.title"),
      desc: t("services.list.maintenance.desc"),
      icon: <Wrench className="w-8 h-8" />,
      tags: ["Security", "Updates", "Monitoring"],
    },
  ];

  const stats = [
    { label: t("services.stats.services"), value: "10+" },
    { label: t("services.stats.projects"), value: "10+" },
    { label: t("services.stats.dedication"), value: "100%" },
    { label: t("services.stats.support"), value: "On Demand" },
  ];

  const openQuoteModal = (serviceName) => {
    dispatch(openModal({ view: "quote", data: { service: serviceName } }));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-x-hidden !pt-20 !m-0 transition-colors duration-300">
      <SEO
        title={t("navbar.services")}
        description="Servizi di sviluppo web: Siti vetrina, Web App complesse, API Backend e automazioni AI."
        path="/Servizi"
      />
      {/* HERO SECTION */}
      <section className="relative pt-5 pb-16 px-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 bg-blue-50 dark:bg-blue-900/30 border border-[#bdd7fa] text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-widest rounded-none">
              <Zap className="w-4 h-4" />
              {t("services.hero.tag")}
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white leading-tight">
              {t("services.hero.title_1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                {t("services.hero.title_2")}
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t("services.hero.desc")}
            </p>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-none hover:border-[#bdd7fa] transition-colors"
              >
                <div className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRIGLIA SERVIZI */}
      <section className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onCtaClick={() => openQuoteModal(service.title)}
              btnLabel={t("services.card_btn")} // Passiamo la label tradotta
            />
          ))}
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-20 bg-slate-900 dark:bg-black text-white text-center relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-6">{t("services.cta.title")}</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">{t("services.cta.desc")}</p>
          <div className="flex justify-center gap-6">
            <ElectroBorder radius={0} borderColor="#bdd7fa" borderWidth={1.5} className="w-fit">
              <button
                onClick={() => openQuoteModal("Generico")}
                className="px-8 py-3 bg-transparent text-white font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                {t("services.cta.btn")} <ArrowRight className="w-4 h-4" />
              </button>
            </ElectroBorder>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </section>
    </div>
  );
}

// --- COMPONENTE CARD SPOTLIGHT (Aggiornato con Dark Mode) ---
function ServiceCard({ service, index, onCtaClick, btnLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 flex flex-col rounded-none hover:border-[#bdd7fa] transition-colors overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 mb-6 flex justify-between items-start">
        <div className="p-3 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 rounded-none border border-slate-100 dark:border-slate-700">
          {service.icon}
        </div>
        <span className="text-4xl font-extrabold text-slate-100 dark:text-slate-700 group-hover:text-blue-600/50 transition-colors duration-300 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative z-10 flex-1">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">{service.desc}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono uppercase bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-2 py-1 border border-slate-100 dark:border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-6 border-t border-slate-100 dark:border-slate-700 group-hover:border-blue-100 dark:group-hover:border-blue-900 transition-colors">
        <button
          onClick={onCtaClick}
          className="w-full py-2 flex items-center justify-between text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
        >
          {btnLabel}
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

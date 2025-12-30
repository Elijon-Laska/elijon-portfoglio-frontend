import SEO from "../SEO";
import React, { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/slices/uiSlice";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import ElectroBorder from "../lightswind/electro-border.tsx";
import { Link } from "react-router-dom";
import FotoProfiloElijon from "../../assets/img/foto.profilo.elijon.jpg";
import Laptop from "../../assets/img/Laptop.png";
import ElijonMatr from "../../assets/img/ElijonMatr.jpeg";
import {
  Code,
  Coffee,
  BookOpen,
  Rocket,
  CheckCircle,
  FileDown,
  Globe,
  MapPin,
  MessageSquare,
  Clock,
  Monitor,
  Loader2, // Icona per lo spinner locale
} from "lucide-react";

// 2. IMPORT DINAMICO PER LA GALLERIA (Invece di import statico)
const ThreeDHoverGallery = lazy(() => import("../lightswind/3d-hover-gallery.jsx"));

// Immagini per la galleria
const galleryImages = [ElijonMatr, FotoProfiloElijon, Laptop];

export default function ChiSono() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const myJourney = [
    {
      year: "2023",
      title: t("about.timeline.step_1.title"),
      desc: t("about.timeline.step_1.desc"),
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      year: "2024",
      title: t("about.timeline.step_2.title"),
      desc: t("about.timeline.step_2.desc"),
      icon: <Coffee className="w-5 h-5" />,
    },
    {
      year: "2025",
      title: t("about.timeline.step_3.title"),
      desc: t("about.timeline.step_3.desc"),
      icon: <Code className="w-5 h-5" />,
    },
    {
      year: "Oggi",
      title: t("about.timeline.step_4.title"),
      desc: t("about.timeline.step_4.desc"),
      icon: <Rocket className="w-5 h-5" />,
    },
  ];

  const softSkills = [
    t("about.soft_skills.list.problem_solving"),
    t("about.soft_skills.list.communication"),
    t("about.soft_skills.list.time_mgmt"),
    t("about.soft_skills.list.teamwork"),
    t("about.soft_skills.list.adaptability"),
    t("about.soft_skills.list.curiosity"),
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-x-hidden transition-colors duration-300">
      <SEO
        title={t("navbar.about")}
        description="Scopri il percorso professionale, la formazione e le soft skills di Elijon Laska. Uno sguardo approfondito su chi sono e come lavoro."
        path="/Chi-Sono"
      />
      {/* HERO SECTION */}
      <section className="container mx-auto px-4 pt-30 pb-4 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* LATO SINISTRO: Testo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30">
              {t("about.hero.tag")}
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight text-slate-900 dark:text-white">
              {t("about.hero.title_1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                {t("about.hero.title_2")}
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              <Trans
                i18nKey="about.hero.desc_1"
                components={{ bold: <span className="font-bold text-slate-800 dark:text-white" /> }}
              />
            </p>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">{t("about.hero.desc_2")}</p>

            <ElectroBorder radius={0} borderColor="#bdd7fa" borderWidth={1.5} className="w-fit">
              <a
                href="/CV_Elijon_Laska_W.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-white transition-colors flex items-center gap-2 cursor-pointer !no-underline"
              >
                <FileDown className="w-5 h-5" />
                <span>{t("about.hero.download_cv")}</span>
              </a>
            </ElectroBorder>
          </motion.div>

          {/* LATO DESTRO: 3D Gallery con LAZY LOADING LOCALE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full flex justify-center perspective-container !rounded-none min-h-[300px]"
          >
            {/* 3. WRAPPER SUSPENSE: Mostra uno spinner solo qui mentre la galleria carica */}
            <Suspense
              fallback={
                <div className="flex flex-col items-center justify-center h-64 w-full bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-3" />
                  <span className="text-xs text-slate-400 font-mono uppercase">Caricamento 3D...</span>
                </div>
              }
            >
              <ThreeDHoverGallery images={galleryImages} />
            </Suspense>
          </motion.div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="pt-10 pb-0 bg-slate-50 dark:bg-slate-900/50 relative transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{t("about.timeline.title")}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t("about.timeline.subtitle")}</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 transform md:-translate-x-1/2" />
            <div className="flex flex-col gap-12 ">
              {myJourney.map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOFT SKILLS SECTION */}
      <section className="py-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{t("about.soft_skills.title")}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t("about.soft_skills.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {softSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-[#bdd7fa] transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">{skill}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- MODALITÀ DI LAVORO --- */}
      <section className="py-5 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">{t("about.work_mode.title")}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t("about.work_mode.subtitle")}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* CARD 1: REMOTO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-8 border-2 border-[#bdd7fa] bg-blue-50/30 dark:bg-blue-900/10 overflow-hidden group hover:shadow-lg transition-all"
            >
              <div className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold px-3 py-1 uppercase tracking-wide">
                {t("about.work_mode.remote.badge")}
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  {t("about.work_mode.remote.title")}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{t("about.work_mode.remote.desc")}</p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-3 text-left inline-block mt-2">
                  <li className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{t("about.work_mode.remote.feat_1")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{t("about.work_mode.remote.feat_2")}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Monitor className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{t("about.work_mode.remote.feat_3")}</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* CARD 2: LOCALE */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 border-2 border-[#bdd7fa] bg-blue-50/30 dark:bg-blue-900/10 group hover:border-[#bdd7fa] hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 flex items-center justify-center shadow-sm mb-6 text-slate-600 dark:text-slate-400 group-hover:bg-[#bdd7fa]/20 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  {t("about.work_mode.local.title")}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">{t("about.work_mode.local.desc")}</p>

                <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-bold">
                  <span>🇮🇹</span>
                  <span>{t("about.work_mode.local.location")}</span>
                </div>

                <ElectroBorder radius={0} borderColor="#bdd7fa" borderWidth={2} className="w-fit mt-6 pt-1">
                  <button
                    onClick={() => dispatch(openModal({ view: "collaborate" }))}
                    className="px-8 py-3 bg-none text-blue-700/80 dark:text-blue-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    {t("about.work_mode.local.cta")}
                  </button>
                </ElectroBorder>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-black dark:to-slate-900 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t("about.cta.title")}</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">{t("about.cta.desc")}</p>
          <div className="flex justify-center gap-4">
            <Link
              to="/Contattami"
              className="px-8 py-3 bg-[#bdd7fa] text-slate-900 font-bold hover:bg-white transition-colors shadow-lg shadow-blue-900/50 !no-underline"
            >
              {t("about.cta.contact_btn")}
            </Link>

            <Link
              to="/Competenze"
              className="px-8 py-3 bg-transparent border-2 border-[#bdd7fa] !text-[#bdd7fa] font-bold hover:!text-[#bdd7fa]/50 transition-colors !no-underline"
            >
              {t("about.cta.skills_btn")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineItem({ item, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative flex items-center md:justify-between ${isEven ? "md:flex-row-reverse" : ""}`}
    >
      <div className="hidden md:block w-5/12" />

      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 bg-white dark:bg-slate-900 border-4 border-[#bdd7fa] flex items-center justify-center z-10 shadow-sm">
        <div className="text-blue-600 dark:text-blue-400">{item.icon}</div>
      </div>

      <div className="w-full md:w-5/12 pl-12 md:pl-0">
        <div
          className={`p-6 bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-shadow relative
             ${isEven ? "md:mr-auto" : "md:ml-auto"}
        `}
        >
          <div
            className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-b border-l border-slate-100 dark:border-slate-800 transform rotate-45
              ${isEven ? "-right-2 border-r border-t border-b-0 border-l-0" : "-left-2"}
          `}
          />

          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 mb-1 block">{item.year}</span>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{item.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

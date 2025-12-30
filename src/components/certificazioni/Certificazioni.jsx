import SEO from "../SEO";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // 1. IMPORT
import ElectroBorder from "../lightswind/electro-border.jsx";
import ThreeDCarousel from "../lightswind/ThreeDCarousel.jsx";
import {
  Award,
  Calendar,
  CheckCircle,
  FileText,
  Clock,
  Layers,
  Code2,
  Database,
  Box,
  Cpu,
  Monitor,
} from "lucide-react";
import MajoranaBuilding from "../../assets/img/itt_ettore_majorana_milazzo.jpg";
import MajoranaLogo from "../../assets/img/logo_majorana.png";
import PreviewFullStack from "../../assets/img/preview_fullstack.jpg.png";
import PreviewAdecco from "../../assets/img/preview_adecco.jpg.png";
import PreviewPython from "../../assets/img/preview_python.jpg.png";

// --- DATI MODULI TECNICI (Questi titoli sono tecnici, spesso non si traducono, ma se vuoi puoi usare t()) ---
const technicalModules = [
  {
    id: "m_jpa",
    title: "JPA / PostgreSQL / SQL",
    date: "28/03/2025",
    icon: <Database className="w-8 h-8" />,
    fileLink: "/Certificato_JPA_PostgreSQL_SQL.pdf",
  },
  {
    id: "m_streams",
    title: "Java Streams & Collections",
    date: "21/03/2025",
    icon: <Code2 className="w-8 h-8" />,
    fileLink: "/certificat_collections_javaStream_and_lambdaExpressions_fileHendling.pdf",
  },
  {
    id: "m_oop",
    title: "OOP / Java",
    date: "14/03/2025",
    icon: <Box className="w-8 h-8" />,
    fileLink: "/certificato_oop_java.pdf",
  },
  {
    id: "m_react",
    title: "React Testing & Redux",
    date: "14/02/2025",
    icon: <Cpu className="w-8 h-8" />,
    fileLink: "/Certificato_React_Testing_State_elevation_React_Router_React_components_Redux.pdf",
  },
  {
    id: "m_anim",
    title: "Animations & Flexbox",
    date: "11/01/2025",
    icon: <Monitor className="w-8 h-8" />,
    fileLink: "/certificato_Animations_CSS3_HTML5_Flexbox.pdf",
  },
  {
    id: "m_js",
    title: "JS Functions & Loops",
    date: "06/12/2024",
    icon: <Code2 className="w-8 h-8" />,
    fileLink: "/Functions_Objects_Arrays_Conditionals_Loops_variables.pdf",
  },
  {
    id: "m_css",
    title: "HTML5 / CSS3",
    date: "29/11/2024",
    icon: <Layers className="w-8 h-8" />,
    fileLink: "/Certificato_HTML5_CSS3.pdf",
  },
];

export default function Certificazioni() {
  const { t } = useTranslation(); // 2. HOOK

  // 3. DATI DENTRO IL COMPONENTE (per usare t())
  const mainCertifications = [
    {
      id: 1,
      title: t("certifications.list.fullstack.title"),
      issuer: t("certifications.list.fullstack.issuer"),
      date: "13/06/2025",
      hours: t("certifications.list.fullstack.hours"),
      description: t("certifications.list.fullstack.desc"),
      skills: ["Java", "Spring Framework", "React.js", "PostgreSQL", "TypeScript", "Redux", "JPA"],
      image: PreviewFullStack,
      fileLink: "/Certificato_Full_Stack_Developer.pdf",
      isPrimary: true,
    },
    {
      id: 2,
      title: t("certifications.list.adecco.title"),
      issuer: t("certifications.list.adecco.issuer"),
      date: "30/10/2025",
      hours: t("certifications.list.adecco.hours"),
      description: t("certifications.list.adecco.desc"),
      skills: ["Analisi Funzionale", "Sviluppo Software", "Database Relazionali"],
      image: PreviewAdecco,
      fileLink: "/Attestato_Analista_programmatore.pdf",
      isPrimary: false,
    },
    {
      id: 3,
      title: t("certifications.list.python.title"),
      issuer: t("certifications.list.python.issuer"),
      date: "04/08/2025",
      hours: t("certifications.list.python.hours"),
      description: t("certifications.list.python.desc"),
      skills: ["Python", "Data Manipulation", "Scripting"],
      image: PreviewPython,
      fileLink: "/Attestato_python.pdf",
      isPrimary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-x-hidden !pt-20 !m-0 pb-20 transition-colors duration-300">
      <SEO
        title={t("navbar.certifications")}
        description="Certificazioni ufficiali e percorsi formativi completati da Elijon Laska."
        path="/Certificazioni"
      />
      {/* HERO SECTION */}
      <section className="pt-5 pb-16 px-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 bg-blue-50 dark:bg-blue-900/30 border border-[#bdd7fa] text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-widest rounded-none">
              <Award className="w-4 h-4" />
              {t("certifications.hero.tag")}
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 text-slate-900 dark:text-white">
              {t("certifications.hero.title")} <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                {t("certifications.hero.highlight")}
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {t("certifications.hero.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- SEZIONE 1: CERTIFICAZIONI PRINCIPALI --- */}
      <section className="container mx-auto px-4 py-16 max-w-5xl space-y-12">
        <div className="border-l-4 border-[#bdd7fa] pl-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("certifications.main_title")}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t("certifications.main_desc")}</p>
        </div>

        {mainCertifications.map((cert, index) => (
          <CertificateCard key={cert.id} cert={cert} index={index} t={t} />
        ))}
      </section>

      {/* --- SEZIONE 2: CAROSELLO 3D MODULI --- */}
      <section className="container mx-auto px-4 py-10 max-w-6xl overflow-visible">
        <div className="border-l-4 border-slate-300 dark:border-slate-700 pl-6 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{t("certifications.modules_title")}</h2>
          <p className="text-slate-500 dark:text-slate-400">
            {t("certifications.modules_desc")} <br />
            <span className="text-xs text-blue-500 dark:text-blue-400 font-bold uppercase tracking-wider">
              {t("certifications.modules_hover")}
            </span>
          </p>
        </div>

        <div className="p-0">
          <ThreeDCarousel modules={technicalModules} />
        </div>
      </section>

      {/* --- SEZIONE 3: DIPLOMA --- */}
      <section className="container mx-auto px-4 py-10 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden group rounded-none"
        >
          <div className="absolute top-0 left-0 w-full h-48 overflow-hidden z-0">
            <img
              src={MajoranaBuilding}
              alt="Istituto Ettore Majorana"
              className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-slate-900 dark:via-slate-900/50" />
          </div>

          <div className="relative z-10 flex flex-col items-center pt-24 pb-8 px-6 text-center">
            <div className="w-24 h-24 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-lg flex items-center justify-center p-2 mb-4 rounded-none">
              <img src={MajoranaLogo} alt="Logo Majorana" className="w-full h-full object-contain" />
            </div>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
              {t("certifications.diploma.title")}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">{t("certifications.diploma.school")}</p>

            <div className="w-16 h-1 bg-[#bdd7fa] mb-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left w-full max-w-2xl">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 group-hover:border-[#bdd7fa] transition-colors">
                <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-white font-bold">
                  <Calendar className="w-4 h-4 text-blue-500" /> {t("certifications.diploma.year_label")}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t("certifications.diploma.year_val")}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 border border-slate-100 dark:border-slate-700 group-hover:border-[#bdd7fa] transition-colors">
                <div className="flex items-center gap-2 mb-2 text-slate-800 dark:text-white font-bold">
                  <Award className="w-4 h-4 text-blue-500" /> {t("certifications.diploma.skills_label")}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{t("certifications.diploma.skills_val")}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// --- SOTTO-COMPONENTI ---
function CertificateCard({ cert, index, t }) {
  const isPrimary = cert.isPrimary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative flex flex-col md:flex-row gap-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow rounded-none group
        ${isPrimary ? "border-l-4 border-l-[#bdd7fa]" : ""}
      `}
    >
      <div className="w-full md:w-1/3 flex-shrink-0">
        <div className="relative h-56 w-full overflow-hidden border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 group-hover:border-[#bdd7fa] transition-colors rounded-none">
          <img
            src={cert.image}
            alt={cert.title}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="hidden absolute inset-0 items-center justify-center text-slate-300 dark:text-slate-600">
            <Award className="w-20 h-20" />
          </div>
          <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 border border-blue-100 dark:border-blue-900 rounded-none z-10">
            <CheckCircle className="w-3 h-3" /> {t("certifications.card.verified")}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {cert.title}
            </h3>
            <div className="text-blue-500 dark:text-blue-400 font-semibold text-sm mt-1 uppercase tracking-wide">
              {cert.issuer}
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm font-mono border border-slate-100 dark:border-slate-700 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-none">
            <Calendar className="w-4 h-4" /> {cert.date}
          </div>
        </div>

        <div className="mb-4 inline-block">
          <span className="flex items-center gap-1 text-xs font-bold bg-[#bdd7fa]/10 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-none">
            <Clock className="w-3 h-3" /> {cert.hours}
          </span>
        </div>

        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed text-sm md:text-base">
          {cert.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {cert.skills.map((skill) => (
            <span
              key={skill}
              className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-none border border-slate-200 dark:border-slate-700"
            >
              #{skill}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {cert.fileLink && (
            <ElectroBorder radius={0} borderColor="#bdd7fa" borderWidth={1.5} className="w-fit">
              <a
                href={cert.fileLink}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm rounded-none !no-underline"
              >
                <FileText className="w-4 h-4" /> {t("certifications.card.view_pdf")}
              </a>
            </ElectroBorder>
          )}
        </div>
      </div>
    </motion.div>
  );
}

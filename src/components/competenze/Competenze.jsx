import SEO from "../SEO";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next"; // 1. IMPORT
import ElectroBorder from "../lightswind/electro-border.tsx";
import {
  Code2,
  Server,
  Database,
  Wrench,
  Globe,
  Brain,
  Users,
  Sparkles,
  Target,
  Zap,
  MessageSquare,
  Puzzle,
  UserCheck,
  RefreshCw,
  ScanEye,
  HeartHandshake,
} from "lucide-react";

// Varianti Animazioni (possono stare fuori)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
};

export default function Competenze() {
  const { t } = useTranslation(); // 2. HOOK

  // 3. DEFINIZIONE DATI DENTRO IL COMPONENTE (per usare t())
  const skillCategories = [
    {
      id: "frontend",
      title: "Front-End Ecosystem",
      icon: <Globe className="w-6 h-6" />,
      description: t("skills.hard.frontend_desc"),
      skills: [
        { name: "React.js", level: "Advanced", tags: ["Redux", "Hooks", "Context"] },
        { name: "JavaScript (ES6+)", level: "Advanced", tags: ["Async/Await", "DOM"] },
        { name: "TypeScript", level: "Intermediate", tags: ["Types", "Interfaces"] },
        { name: "Angular", level: "Intermediate", tags: ["Components", "Services"] },
        { name: "CSS3 / Sass", level: "Advanced", tags: ["Animations", "Flexbox"] },
        { name: "Bootstrap", level: "Advanced", tags: ["Layout", "UI Kit"] },
      ],
    },
    {
      id: "backend",
      title: "Back-End & Architecture",
      icon: <Server className="w-6 h-6" />,
      description: t("skills.hard.backend_desc"),
      skills: [
        { name: "Java", level: "Advanced", tags: ["OOP", "Streams", "Multi-threading"] },
        { name: "Spring Boot", level: "Advanced", tags: ["MVC", "Security", "JPA"] },
        { name: "C#", level: "Intermediate", tags: [".NET", "Visual Studio"] },
        { name: "Python", level: "Basic", tags: ["Django", "Scripting"] },
        { name: "RESTful APIs", level: "Advanced", tags: ["Swagger", "Postman"] },
      ],
    },
    {
      id: "database",
      title: "Data Persistence",
      icon: <Database className="w-6 h-6" />,
      description: t("skills.hard.db_desc"),
      skills: [
        { name: "PostgreSQL", level: "Advanced", tags: ["Relational", "pgAdmin"] },
        { name: "SQL Server", level: "Intermediate", tags: ["SSMS", "T-SQL"] },
        { name: "JPA / Hibernate", level: "Intermediate", tags: ["ORM", "Entity Mapping"] },
      ],
    },
    {
      id: "tools",
      title: "DevOps & Tools",
      icon: <Wrench className="w-6 h-6" />,
      description: t("skills.hard.tools_desc"),
      skills: [
        { name: "Git & GitHub", level: "Advanced", tags: ["Version Control", "Actions"] },
        { name: "Vite", level: "Intermediate", tags: ["Build Tool"] },
        { name: "Postman", level: "Advanced", tags: ["API Testing"] },
        { name: "IntelliJ / VS Code", level: "Advanced", tags: ["IDE"] },
      ],
    },
  ];

  const softSkills = [
    {
      icon: <Puzzle className="w-6 h-6" />,
      ...t("skills.soft.list.problem_solving", { returnObjects: true }), // Carica cat, title, desc dal JSON
    },
    {
      icon: <Brain className="w-6 h-6" />,
      ...t("skills.soft.list.strategic", { returnObjects: true }),
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      ...t("skills.soft.list.communication", { returnObjects: true }),
    },
    {
      icon: <Users className="w-6 h-6" />,
      ...t("skills.soft.list.teamwork", { returnObjects: true }),
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      ...t("skills.soft.list.client", { returnObjects: true }),
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      ...t("skills.soft.list.autonomy", { returnObjects: true }),
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      ...t("skills.soft.list.adaptability", { returnObjects: true }),
    },
    {
      icon: <ScanEye className="w-6 h-6" />,
      ...t("skills.soft.list.details", { returnObjects: true }),
    },
    {
      icon: <Zap className="w-6 h-6" />,
      ...t("skills.soft.list.proactivity", { returnObjects: true }),
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      ...t("skills.soft.list.innovation", { returnObjects: true }),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-x-hidden px-0 pt-20 !m-0 transition-colors duration-300">
      <SEO
        title={t("navbar.skills")}
        description="Le mie competenze tecniche: Java, Spring Boot, React, JavaScript e architetture cloud."
        path="/Competenze"
      />
      {/* --- HERO SECTION --- */}
      <section className="relative pt-5 pb-16 px-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 bg-blue-50 dark:bg-blue-900/30 border border-[#bdd7fa] text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-widest rounded-none">
              <Code2 className="w-4 h-4" />
              {t("skills.hero.tag")}
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white leading-tight">
              {t("skills.hero.title_1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                {t("skills.hero.title_2")}
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              <Trans
                i18nKey="skills.hero.desc"
                components={{ bold: <span className="font-bold text-slate-800 dark:text-white" /> }}
              />
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
          >
            <StatCard number="1000+" label={t("skills.stats.training")} />
            <StatCard number="10+" label={t("skills.stats.techs")} />
            <StatCard number="100%" label={t("skills.stats.fullstack")} />
            <StatCard number="24/7" label={t("skills.stats.passion")} />
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-300 blur-[100px] rounded-full mix-blend-multiply" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-cyan-300 blur-[100px] rounded-full mix-blend-multiply" />
        </div>
      </section>

      {/* --- HARD SKILLS GRID --- */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="mb-12 border-l-4 border-[#bdd7fa] pl-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t("skills.hard.title")}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t("skills.hard.subtitle")}</p>
        </div>

        {skillCategories.map((category, idx) => (
          <div key={category.id} className="mb-20 last:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8 border-b-2 border-slate-100 dark:border-slate-800 pb-4"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-none border border-[#bdd7fa]">
                {category.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{category.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{category.description}</p>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {category.skills.map((skill, skillIdx) => (
                <SkillCard key={skillIdx} skill={skill} index={skillIdx} />
              ))}
            </motion.div>
          </div>
        ))}
      </section>

      {/* --- SOFT SKILLS SECTION --- */}
      <section className="bg-slate-50 dark:bg-slate-900 py-20 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 border-l-4 border-blue-400 pl-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{t("skills.soft.title")}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t("skills.soft.subtitle")}</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {softSkills.map((skill, idx) => (
              <SoftSkillCard key={idx} skill={skill} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-slate-900 dark:bg-black text-white text-center relative overflow-hidden transition-colors duration-300">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-6">{t("skills.cta.title")}</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">{t("skills.cta.desc")}</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <ElectroBorder radius={0} borderColor="#bdd7fa" borderWidth={1.5} className="w-fit">
              <a
                href="/Certificazioni"
                className="px-8 py-3 bg-transparent text-white font-bold hover:bg-white/10 transition-colors block !no-underline"
              >
                {t("skills.cta.btn")}
              </a>
            </ElectroBorder>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </section>
    </div>
  );
}

// --- SOTTO-COMPONENTI (Aggiornati con Dark Mode) ---

function StatCard({ number, label }) {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-none shadow-sm hover:border-[#bdd7fa] transition-colors group">
      <div className="text-3xl font-extrabold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">
        {number}
      </div>
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function SkillCard({ skill }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
      className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-none group hover:border-[#bdd7fa] transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-slate-100 dark:border-r-slate-700 group-hover:border-r-[#bdd7fa] transition-colors" />

      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">
          {skill.name}
        </h3>
        <div className="flex gap-1 mt-1.5">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-1.5 h-1.5 rounded-none ${
                (skill.level === "Advanced" && dot <= 3) ||
                (skill.level === "Intermediate" && dot <= 2) ||
                (skill.level === "Basic" && dot <= 1)
                  ? "bg-blue-500"
                  : "bg-slate-200 dark:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full h-0.5 bg-slate-100 dark:bg-slate-700 mb-4 overflow-hidden">
        <div className="h-full bg-[#bdd7fa] w-0 group-hover:w-full transition-all duration-700 ease-out" />
      </div>

      <div className="flex flex-wrap gap-2">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-1 border border-slate-100 dark:border-slate-700 rounded-none"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function SoftSkillCard({ skill }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-slate-800 p-6 border border-slate-200 dark:border-slate-700 rounded-none hover:shadow-lg transition-all group relative"
    >
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#bdd7fa] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="flex items-start gap-4">
        <div className="p-3 bg-slate-50 dark:bg-slate-900 text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors rounded-none">
          {skill.icon}
        </div>
        <div>
          <span className="text-xs font-bold text-[#bdd7fa] uppercase tracking-wider mb-1 block group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {skill.cat || skill.category}
          </span>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {skill.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

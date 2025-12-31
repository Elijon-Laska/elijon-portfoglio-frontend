import SEO from "./SEO";
import "./Home.css";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import fotoElijon from "../assets/img/fotoElijon.png";
import HomeActions from "./HomeActions";
import ElectroBorder from "../components/lightswind/electro-border";
import TechMarqueeSection from "./componentiVari/TechMarqueeSection";

export default function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // MODIFICA: Ho separato le classi per avere controllo su Bordo/Ombra e Sfondo
  const skillsData = [
    {
      id: "react",
      title: "React",
      tools: "Redux, React Router DOM, Props",
      // Classi per il container esterno (Bordo colorato + Ombra colorata)
      hoverClasses: "hover:border-l-blue-400 hover:shadow-blue-400/50",
      // Classe per lo sfondo interno (senza 'hover:', gestito da framer motion o css)
      overlayBg: "bg-blue-400",
      route: "/Competenze",
    },
    {
      id: "js",
      title: "JavaScript",
      tools: "ES6+, TypeScript, Functional Programming",
      hoverClasses: "hover:border-l-yellow-400 hover:shadow-yellow-400/50",
      overlayBg: "bg-yellow-400",
      route: "/Competenze",
    },
    {
      id: "java",
      title: "Java",
      tools: "Spring Boot, OOP, CRUD",
      hoverClasses: "hover:border-l-orange-400 hover:shadow-orange-500/50",
      overlayBg: "bg-orange-400",
      route: "/Competenze",
    },
    {
      id: "spring",
      title: "Spring",
      tools: "Dependency Injection, Bean, JPA, JUnit",
      hoverClasses: "hover:border-l-green-500 hover:shadow-green-500/50",
      overlayBg: "bg-green-500",
      route: "/Competenze",
    },
    {
      id: "C#",
      title: "C#",
      tools: "ASP.NET, Entity Framework, LINQ",
      hoverClasses: "hover:border-l-purple-500 hover:shadow-purple-500/50",
      overlayBg: "bg-purple-500",
      route: "/Competenze",
    },
    {
      id: "sql",
      title: "SQL",
      tools: "PostgreSQL, Queries, CTE",
      hoverClasses: "hover:border-l-indigo-400 hover:shadow-indigo-400/50",
      overlayBg: "bg-indigo-400",
      route: "/Competenze",
    },
  ];

  return (
    <section className="home-presentation container px-4 pt-18 mt-5 mb-0">
      <SEO
        title="Elijon Laska | Full Stack Developer"
        description="Benvenuti nel portfolio di Elijon Laska. Sviluppo soluzioni web scalabili e moderne."
        path="/"
      />
      <div className="row align-items-center">
        {/* LATO SINISTRO: Testi + Skills */}
        <div className="col-lg-6 order-2 order-lg-1 presentation-side">
          <div className="presentation-text">
            <h1>
              {t("home.greeting")}
              <Link to="/Chi-Sono" className="nomeHome">
                Elijon Laska
              </Link>
            </h1>
            <div className="typing-phrases">
              <div className="phrase" style={{ "--w": "7ch", "--steps": 7 }}>
                {t("home.typing.creator")}
              </div>
              <div className="phrase" style={{ "--w": "20ch", "--steps": 20 }}>
                {t("home.typing.fullstack")}
              </div>
              <div className="phrase" style={{ "--w": "9ch", "--steps": 9 }}>
                {t("home.typing.innovator")}
              </div>
              <div className="phrase" style={{ "--w": "15ch", "--steps": 15 }}>
                {t("home.typing.problem_solver")}
              </div>
              <div className="phrase" style={{ "--w": "13ch", "--steps": 13 }}>
                {t("home.typing.enthusiast")}
              </div>
            </div>
            <p>{t("home.role_description")}</p>
          </div>

          <ElectroBorder radius={0} borderColor="#bdd7fa" borderWidth={1.5} className="h-full m-2 px-3">
            <section className="skills-section py-4 px-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                {skillsData.map((skill) => (
                  <SkillRevealer key={skill.id} skill={skill} onClick={() => navigate(skill.route)} />
                ))}
              </div>
            </section>
          </ElectroBorder>
        </div>

        {/* LATO DESTRO: Foto */}
        <div className="col-lg-6 order-1 order-lg-2 text-center image-side">
          <div className="profile-column">
            <div className="profile-photo-wrapper">
              <div className="profile-photo-container" tabIndex="0">
                <img src={fotoElijon} alt="Foto di Elijon" className="profile-photo" />
                <div className="profile-overlay" aria-hidden="true">
                  <div className="overlay-text">
                    <div className="name">Elijon Laska</div>
                    <div className="role">Full-Stack Developer</div>
                  </div>
                </div>
                <div className="profile-overlay2" aria-hidden="true">
                  <div className="overlay-text2">
                    <div className="html">HTML</div>
                    <div className="css">CSS</div>
                    <div className="js">JavaScript</div>
                    <div className="ts">TypeScript</div>
                    <div className="bootstrap">Bootstrap</div>
                    <div className="react">React</div>
                    <div className="java">Java</div>
                    <div className="spring">Spring</div>
                    <div className="sql">SQL</div>
                    <div className="csharp">C#</div>
                    <div className="python">Python</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-center lg:justify-start">
              <HomeActions />
            </div>
          </div>
        </div>
      </div>
      <TechMarqueeSection />
    </section>
  );
}

// --- COMPONENTE AGGIORNATO ---
function SkillRevealer({ skill, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      // QUI APPLICHIAMO LE CLASSI DINAMICHE:
      // 1. border-l-[#bdd7fa]: default
      // 2. ${skill.hoverClasses}: contiene hover:border-l-COLORE e hover:shadow-COLORE
      // 3. hover:shadow-lg: Necessario per far espandere l'ombra, che prenderà il colore definito sopra
      className={`
        relative cursor-pointer overflow-hidden 
        bg-white/90 backdrop-blur-sm 
        border-l-4 border-l-[#bdd7fa] border-y border-r border-slate-200 
        ${skill.hoverClasses}
        h-[6.5rem] shadow-sm hover:shadow-lg
        transition-all duration-300
      `}
    >
      <div className="h-full w-full px-4 flex flex-col justify-center relative z-10">
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: { y: -12 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-slate-800">{skill.title}</h3>
          </div>

          <motion.div
            variants={{
              rest: { opacity: 0, x: -10 },
              hover: { opacity: 1, x: 0 },
            }}
            className="text-blue-500/50"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              margin-left="auto"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </motion.div>
        </motion.div>

        <motion.div
          variants={{
            rest: { opacity: 0, y: 15, height: 0 },
            hover: { opacity: 1, y: 0, height: "auto" },
          }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="text-xs text-slate-500 font-medium mt-1 leading-tight"
        >
          {skill.tools}
        </motion.div>
      </div>

      {/* SFONDO DINAMICO */}
      {/* Qui usiamo skill.overlayBg per prendere il colore corretto (es. bg-yellow-400) */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          // opacity: 0.1 rende lo sfondo semi-trasparente e delicato
          hover: { opacity: 0.05 },
        }}
        className={`absolute inset-0 ${skill.overlayBg} z-0 pointer-events-none`}
      />
    </motion.div>
  );
}

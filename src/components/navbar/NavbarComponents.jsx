import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import "./NavbarComponents.css";
import profilePic from "../../assets/img/immagine-profiloo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

// --- 1. IL TUO MOTORE DI RICERCA (CONFIGURAZIONE) ---
// Aggiungi qui tutte le parole che vuoi. Non serve mettere maschile/femminile se usi la radice.
const searchIndex = [
  {
    path: "/Competenze",
    keywords: [
      // Tech Stack & Linguaggi
      "java",
      "spring",
      "boot",
      "react",
      "js",
      "javascript",
      "node",
      "html",
      "css",
      "sass",
      "sql",
      "postgres",
      "db",
      "database",
      "git",
      "github",
      "api",
      "rest",
      "mvc",
      "oop",
      "redux",
      "vite",
      "tailwind",
      "bootstrap",
      "typescript",
      "ts",
      // Parole generiche competenze
      "skill",
      "competenz",
      "capacita",
      "tecnologi",
      "stack",
      "code",
      "codic",
      "programmazion",
      "backend",
      "frontend",
      "full",
      "software",
    ],
  },
  {
    path: "/Servizi",
    keywords: [
      // Servizi specifici
      "sito",
      "web",
      "app",
      "progett",
      "applicazion",
      "landing",
      "page",
      "ecommerce",
      "e-commerce",
      "blog",
      "cms",
      "seo",
      "ottimizzazion",
      "google",
      "posizionament",
      "design",
      "ui",
      "ux",
      "figma",
      "grafic",
      "bot",
      "chatbot",
      "telegram",
      "whatsapp",
      "automazion",
      "ai",
      "intelligenz",
      "gpt",
      "consulenz",
      "support",
      "manutenzion",
      "deploy",
      "server",
      "hosting",
    ],
  },
  {
    path: "/Contattami",
    keywords: [
      "contatt",
      "email",
      "mail",
      "scriv",
      "chiama",
      "telefon",
      "numer",
      "whatsapp",
      "preventiv",
      "cost",
      "prezz",
      "collabor",
      "lavor",
      "assum",

      "idea",
      "info",
      "domand",
      "messaggi",
      "richiest",
    ],
  },
  {
    path: "/Certificazioni",
    keywords: [
      "certificat",
      "attestat",
      "diploma",
      "studi",
      "laurea",
      "master",
      "cors",
      "formazion",
      "epicode",
      "adecco",
      "majorana",
      "scuola",
      "voto",
      "esame",
      "python",
    ],
  },
  {
    path: "/Chi-Sono",
    keywords: [
      "chi sono",
      "eli",
      "storia",
      "biografia",
      "profilo",
      "background",
      "passione",
      "hobby",
      "roma",
      "italia",
      "albania",
      "lingue",
      "inglese",
      "curriculum",
      "cv",
      "vita",
      "person",
    ],
  },
];

export default function NavbarComponents() {
  const [isScrolled, setIsScrolled] = useState(() => window.scrollY > 70);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 70);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // --- 2. LOGICA DI RICERCA AVANZATA ---
  const handleSearch = (e) => {
    e.preventDefault();

    // Normalizziamo: tutto minuscolo e togliamo spazi extra
    const term = searchTerm.toLowerCase().trim();

    if (!term) return;

    let foundPath = null;

    // Cicla attraverso il nostro indice
    // .find() si ferma appena trova una corrispondenza (priorità dall'alto verso il basso)
    const match = searchIndex.find((section) => section.keywords.some((keyword) => term.includes(keyword)));

    if (match) {
      foundPath = match.path;
    }

    // --- Gestione Risultati ---
    if (foundPath) {
      navigate(foundPath);
    } else {
      // Fallback intelligente: se non capisce, mandalo ai servizi o mostra alert
      // Opzione A: Alert (quello che hai ora)
      alert(`Non ho trovato una pagina esatta per "${searchTerm}", ma prova a guardare i miei Servizi!`);
      navigate("/Servizi"); // Lo portiamo comunque in una pagina utile
    }

    setSearchTerm(""); // Pulisce l'input
  };

  return (
    <header>
      <Navbar bg="light" expand="lg" className={`${isScrolled ? "navbar-scrolled" : ""}`}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="brand-with-photo">
            <img src={profilePic} alt="Elijon" className="brand-photo" />
            <div className="brand-text">
              <div className="brand-name">Elijon Laska</div>
              <div className="brand-sub">Full Stack Developer</div>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto mb-2 mb-lg-0">
              <Nav.Link as={NavLink} to="/" end>
                <i className="bi bi-house-door me-1"></i> {t("navbar.home")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Chi-Sono">
                <i className="bi bi-person me-1"></i> {t("navbar.about")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Competenze">
                <i className="bi bi-gear me-1"></i>
                {t("navbar.skills")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Certificazioni">
                <i className="bi bi-award me-1"></i>
                {t("navbar.certifications")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Servizi">
                <i className="bi bi-lightbulb me-1"></i>
                {t("navbar.services")}
              </Nav.Link>
              <Nav.Link as={NavLink} to="/Contattami">
                <i className="bi bi-envelope-open me-1"></i>
                {t("navbar.contact")}
              </Nav.Link>
            </Nav>
            <Form className="d-flex" role="search" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder={t("navbar.search_placeholder")}
                className="me-2"
                aria-label="Search"
                id="cercaNavbar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <Button variant="outline-success" type="submit" id="submitNavbar">
                {t("navbar.search_button")}
              </Button>
            </Form>
          </Navbar.Collapse>
          {/* 4. IL MAGNETE (Fuori dal Collapse, ma dentro il Container) */}
          <div className="magnet-lang-container ">
            <LanguageSelector isScrolled={isScrolled} />
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

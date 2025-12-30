import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import profilePic from "../../assets/img/immagine-profiloo.png";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation(); // 2. HOOK
  return (
    <footer className="footer bg-dark text-light mt-0">
      <Container>
        <Row className="py-5">
          {/* COLONNA 1: Logo, descrizione e icone social */}
          <Col md={4} className="mb-4 mb-md-0">
            <div className="footer-brand-with-photo">
              <img src={profilePic} alt="Elijon" className="footer-brand-photo" />
              <div className="footer-brand-text">
                <div className="footer-brand-name">Elijon Laska</div>
                <div className="footer-brand-sub">{t("footer.role")}</div>
              </div>
            </div>
            <p className="footer-description">{t("footer.description")}</p>
            <div className="social-icons">
              <a href="https://github.com/Elijon-Laska" target="_blank" rel="noopener noreferrer" title="GitHub">
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/elijon-laska/"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="mailto:laskaelijon95@gmail.com" title="Email">
                <i className="bi bi-envelope"></i>
              </a>
              <a href="https://wa.me/393887505204" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="tel:+393887505204" title="Telefono">
                <i className="bi bi-telephone"></i>
              </a>
            </div>
          </Col>

          {/* COLONNA 2: Link Rapidi */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-section-title">{t("footer.quick_links")}</h5>
            <ul className="footer-links">
              <li>
                <Link to="/Chi-Sono">{t("navbar.about")}</Link>
              </li>
              <li>
                <Link to="/Competenze">{t("navbar.skills")}</Link>
              </li>
              <li>
                <Link to="/Certificazioni">{t("navbar.certifications")}</Link>
              </li>
              <li>
                <Link to="/Servizi">{t("navbar.services")}</Link>
              </li>
              <li>
                <Link to="/Contattami">{t("navbar.contact")}</Link>
              </li>
            </ul>
          </Col>

          {/* COLONNA 3: Servizi */}
          <Col md={4}>
            <h5 className="footer-section-title">{t("footer.services_title")}</h5>
            <ul className="footer-services">
              <li>{t("footer.services_list.frontend")}</li>
              <li>{t("footer.services_list.backend")}</li>
              <li>{t("footer.services_list.fullstack")}</li>
              <li>{t("footer.services_list.consulting")}</li>
              <li>{t("footer.services_list.uiux")}</li>
            </ul>
          </Col>
        </Row>

        {/* COPYRIGHT */}
        <Row className="border-top border-secondary py-3">
          <Col className="text-center">
            <p className="mb-0 footer-copyright">
              &copy; {new Date().getFullYear()} Elijon Laska. {t("footer.copyright")}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

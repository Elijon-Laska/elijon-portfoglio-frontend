import SEO from "../SEO";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next"; // 1. IMPORT
import ElectroBorder from "../lightswind/electro-border.jsx";
import emailjs from "@emailjs/browser";
import {
  Send,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  CheckCircle,
  Zap,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  Handshake,
  Lightbulb,
  FileText,
  MousePointer2,
} from "lucide-react";

export default function Contattami() {
  const { t } = useTranslation(); // 2. HOOK
  const form = useRef();
  const nameInputRef = useRef(null);

  const [formStatus, setFormStatus] = useState("idle");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  // Nota: subjectValue è il valore interno per l'email, subjectDisplay serve per il select se necessario,
  // ma qui usiamo direttamente le chiavi o valori tradotti.
  // Per semplicità manteniamo lo state con un valore di default "tecnico".
  const [subject, setSubject] = useState("Preventivo");

  const handleSubjectClick = (value) => {
    setSubject(value);
    if (form.current) {
      form.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setTimeout(() => {
      if (nameInputRef.current) {
        nameInputRef.current.focus();
      }
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!privacyAccepted) {
      alert(t("contact.form.privacy_alert"));
      return;
    }

    setFormStatus("submitting");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Email inviata:", result.text);
          setFormStatus("success");
          e.target.reset();
          setPrivacyAccepted(false);
          setSubject("Preventivo");
        },
        (error) => {
          console.error("Errore EmailJS:", error.text);
          setFormStatus("error");
          alert(t("contact.form.error_alert"));
        }
      );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 overflow-x-hidden !pt-20 !m-0 transition-colors duration-300">
      <SEO
        title={t("navbar.contact")}
        description="Contatta Elijon Laska per preventivi, collaborazioni o informazioni sui progetti."
        path="/Contattami"
      />
      {/* HERO SECTION */}
      <section className="relative pt-10 pb-16 px-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 bg-blue-50 dark:bg-blue-900/30 border border-[#bdd7fa] text-blue-600 dark:text-blue-400 font-mono text-sm uppercase tracking-widest rounded-none">
              <MessageSquare className="w-4 h-4" />
              {t("contact.hero.tag")}
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white leading-tight">
              {t("contact.hero.title_1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">
                {t("contact.hero.title_2")}
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t("contact.hero.desc")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* --- COLONNA SINISTRA --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-5/12 space-y-10"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-[#bdd7fa]"></span> {t("contact.social.title")}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <SocialCard
                  href="https://github.com/Elijon-Laska"
                  icon={<Github className="w-6 h-6" />}
                  label="GitHub"
                  sub={t("contact.social.github_sub")}
                  color="hover:border-slate-800 hover:text-slate-900 dark:hover:border-slate-400 dark:hover:text-white"
                />
                <SocialCard
                  href="https://www.linkedin.com/in/elijon-laska"
                  icon={<Linkedin className="w-6 h-6" />}
                  label="LinkedIn"
                  sub={t("contact.social.linkedin_sub")}
                  color="hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400"
                />
                <SocialCard
                  href="mailto:laskaelijon95@gmail.com"
                  icon={<Mail className="w-6 h-6" />}
                  label="Email"
                  sub={t("contact.social.email_sub")}
                  color="hover:border-red-500 hover:text-red-500 dark:hover:text-red-400"
                />
                <SocialCard
                  href="https://wa.me/3887505204"
                  icon={<MessageCircle className="w-6 h-6" />}
                  label="WhatsApp"
                  sub={t("contact.social.whatsapp_sub")}
                  color="hover:border-green-500 hover:text-green-500 dark:hover:text-green-400"
                />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MousePointer2 className="w-5 h-5 text-blue-600 dark:text-blue-400" /> {t("contact.help.title")}
              </h3>
              <div className="space-y-4">
                <InfoItem
                  icon={<FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  title={t("contact.help.quote_title")}
                  desc={t("contact.help.quote_desc")}
                  onClick={() => handleSubjectClick("Preventivo")}
                />
                <InfoItem
                  icon={<Handshake className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                  title={t("contact.help.collab_title")}
                  desc={t("contact.help.collab_desc")}
                  onClick={() => handleSubjectClick("Collaborazione")}
                />
                <InfoItem
                  icon={<Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />}
                  title={t("contact.help.info_title")}
                  desc={t("contact.help.info_desc")}
                  onClick={() => handleSubjectClick("Info")}
                />
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-none relative overflow-hidden group hover:border-[#bdd7fa] transition-colors">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#bdd7fa] fill-[#bdd7fa]" /> {t("contact.fast_response.title")}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                <Trans
                  i18nKey="contact.fast_response.desc"
                  components={{ bold: <strong className="text-slate-800 dark:text-white" /> }}
                />
              </p>
            </div>
          </motion.div>

          {/* --- COLONNA DESTRA: FORM --- */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:w-7/12"
          >
            <ElectroBorder radius={0} borderColor="#bdd7fa" borderWidth={1.5} className="w-full h-full">
              <div className="bg-white dark:bg-slate-900 p-8 md:p-10 h-full flex flex-col justify-center">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-none">
                      <Mail className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                      {t("contact.form.title")}
                    </h2>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">{t("contact.form.subtitle")}</p>
                </div>

                {formStatus === "success" ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800"
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center rounded-full mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                      {t("contact.form.success_title")}
                    </h3>
                    <p className="text-green-600 dark:text-green-400">{t("contact.form.success_desc")}</p>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="mt-6 text-sm font-bold text-green-700 dark:text-green-300 underline hover:text-green-900 dark:hover:text-white"
                    >
                      {t("contact.form.success_btn")}
                    </button>
                  </motion.div>
                ) : (
                  <form ref={form} onSubmit={handleSubmit} className="space-y-6 scroll-mt-40">
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputGroup
                        name="user_name"
                        label={`${t("contact.form.labels.name")} *`}
                        placeholder={t("contact.form.placeholders.name")}
                        inputRef={nameInputRef}
                      />
                      <InputGroup
                        name="user_email"
                        label={`${t("contact.form.labels.email")} *`}
                        type="email"
                        placeholder={t("contact.form.placeholders.email")}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {t("contact.form.labels.subject")} *
                      </label>
                      <div className="relative">
                        <select
                          name="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#bdd7fa] focus:ring-1 focus:ring-[#bdd7fa] transition-all appearance-none rounded-none cursor-pointer"
                        >
                          <option value="Preventivo">{t("contact.form.subjects.quote")}</option>
                          <option value="Collaborazione">{t("contact.form.subjects.collab")}</option>
                          <option value="Info">{t("contact.form.subjects.info")}</option>
                          <option value="Altro">{t("contact.form.subjects.other")}</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ArrowRight className="w-4 h-4 rotate-90" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {t("contact.form.labels.message")} *
                      </label>
                      <textarea
                        name="message"
                        required
                        placeholder={t("contact.form.placeholders.message")}
                        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#bdd7fa] focus:ring-1 focus:ring-[#bdd7fa] transition-all min-h-[150px] resize-none rounded-none"
                      ></textarea>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={privacyAccepted}
                        onChange={(e) => setPrivacyAccepted(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-blue-600 cursor-pointer"
                      />
                      <label htmlFor="privacy" className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer">
                        <Trans
                          i18nKey="contact.form.privacy"
                          components={{
                            link: (
                              <a
                                href="https://www.iubenda.com/privacy-policy/49778459"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-600 dark:text-blue-400 font-bold hover:text-blue-800"
                              />
                            ),
                          }}
                        />
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:bg-blue-600 dark:hover:bg-blue-300 dark:hover:text-slate-900 transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed rounded-none"
                    >
                      {formStatus === "submitting" ? (
                        t("contact.form.btn_sending")
                      ) : (
                        <>
                          {t("contact.form.btn_submit")}{" "}
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-4">
                      <ShieldCheck className="w-4 h-4" /> {t("contact.form.security")}
                    </div>
                  </form>
                )}
              </div>
            </ElectroBorder>
          </motion.div>
        </div>
      </section>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-30">
        <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-blue-200/40 dark:bg-blue-900/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-cyan-200/40 dark:bg-cyan-900/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>
    </div>
  );
}

// SOTTO COMPONENTI

function SocialCard({ href, icon, label, sub, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 group ${color} hover:shadow-lg rounded-none !no-underline`}
    >
      <div className="mb-3 text-slate-400 group-hover:text-current transition-colors">{icon}</div>
      <span className="font-bold text-slate-800 dark:text-white text-sm">{label}</span>
      <span className="text-xs text-slate-400 mt-1">{sub}</span>
    </a>
  );
}

function InfoItem({ icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-[#bdd7fa] dark:hover:border-blue-700 transition-colors group cursor-pointer hover:shadow-md"
    >
      <div className="p-2 bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors rounded-none">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{title}</h4>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{desc}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, type = "text", placeholder, name, inputRef }) {
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{label}</label>
      <input
        ref={inputRef}
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#bdd7fa] focus:ring-1 focus:ring-[#bdd7fa] transition-all rounded-none"
      />
    </div>
  );
}

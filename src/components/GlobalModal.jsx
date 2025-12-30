import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, Briefcase, Lightbulb, ChevronRight, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../redux/slices/uiSlice";
// 1. IMPORTA LA TRADUZIONE
import { useTranslation } from "react-i18next";

// --- DEFINIZIONE CHIAVI OPZIONI ---
// Usiamo le chiavi del JSON invece dei testi fissi
const projectTypeKeys = ["website", "webapp", "ecommerce", "blog", "api", "other"];
const featureKeys = ["responsive", "seo", "admin", "login", "payments", "chat", "multilang", "3d"];
const timelineKeys = ["short", "medium", "long", "very_long", "tbd"];
const budgetKeys = ["small", "medium", "large", "xl", "xxl", "tbd"];

export default function GlobalModal() {
  const { isOpen, view, data } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { t } = useTranslation(); // Hook i18n
  const handleClose = () => dispatch(closeModal());

  const modalTitle = view === "collaborate" ? t("modals.titles.collaborate") : t("modals.titles.quote");

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative"
          >
            {/* HEADER */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0 z-10">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">{modalTitle}</h2>
              <button
                onClick={handleClose}
                className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-red-100 hover:text-red-500 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {view === "collaborate" ? (
                <CollaborateFlow onClose={handleClose} t={t} />
              ) : (
                <QuoteForm onClose={handleClose} initialService={data?.service} t={t} />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- QUOTE FORM ---
function QuoteForm({ onClose, initialService, t }) {
  const formRef = useRef();
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [status, setStatus] = useState("idle");
  const [privacy, setPrivacy] = useState(false);

  // Pre-fill messaggio con traduzione dinamica
  const defaultMessage = initialService ? `${t("modals.placeholders.description")} (${initialService})...` : "";

  const toggleFeature = (featKey) => {
    setSelectedFeatures((prev) => (prev.includes(featKey) ? prev.filter((f) => f !== featKey) : [...prev, featKey]));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!privacy) return alert(t("modals.messages.privacy_error"));
    setStatus("submitting");

    // NOTA: Qui invierai le chiavi (es. "website") invece del testo tradotto.
    // Se vuoi il testo tradotto nella mail, dovresti mapparlo prima dell'invio,
    // ma inviare la chiave è spesso meglio per gestione dati.
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          setTimeout(onClose, 3000);
        },
        () => setStatus("error")
      );
  };

  if (status === "success") return <SuccessMessage onClose={onClose} t={t} />;

  return (
    <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-6">
      <input type="hidden" name="subject" value={`Preventivo: ${initialService || "Generico"}`} />

      {/* Campi nascosti per passare i valori leggibili (opzionale, dipende dal template EmailJS) */}
      <input
        type="hidden"
        name="features_list"
        value={selectedFeatures.map((k) => t(`modals.options.features.${k}`)).join(", ")}
      />

      <div className="grid md:grid-cols-2 gap-4">
        <InputGroup
          name="user_name"
          label={`${t("modals.labels.name")} *`}
          placeholder={t("modals.placeholders.name")}
        />
        <InputGroup
          name="user_email"
          label={`${t("modals.labels.email")} *`}
          type="email"
          placeholder={t("modals.placeholders.email")}
        />
      </div>

      <SelectGroup
        name="project_type"
        label={`${t("modals.labels.project_type")} *`}
        options={projectTypeKeys}
        translationPrefix="modals.options.types"
        t={t}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {t("modals.labels.description")} *
        </label>
        <textarea
          name="message"
          required
          defaultValue={defaultMessage}
          className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 outline-none min-h-[120px]"
          placeholder={t("modals.placeholders.description")}
        ></textarea>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-bold text-slate-700 dark:text-slate-200">{t("modals.labels.features")}</label>
        <div className="flex flex-wrap gap-2">
          {featureKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleFeature(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all 
                ${
                  selectedFeatures.includes(key)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-blue-300"
                }`}
            >
              {t(`modals.options.features.${key}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <SelectGroup
          name="timeline"
          label={t("modals.labels.timeline")}
          options={timelineKeys}
          translationPrefix="modals.options.timelines"
          t={t}
        />
        <SelectGroup
          name="budget"
          label={t("modals.labels.budget")}
          options={budgetKeys}
          translationPrefix="modals.options.budgets"
          t={t}
        />
      </div>

      <PrivacyCheckbox checked={privacy} onChange={setPrivacy} t={t} />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-70"
      >
        {status === "submitting" ? t("modals.buttons.sending") : t("modals.buttons.send_request")}
      </button>
    </form>
  );
}

// --- COLLABORATE FLOW ---
function CollaborateFlow({ onClose, t }) {
  const [step, setStep] = useState("menu");
  const formRef = useRef();
  const [status, setStatus] = useState("idle");
  const [privacy, setPrivacy] = useState(false);

  const goTo = (s) => {
    setStep(s);
    setPrivacy(false);
  };

  const sendCollab = (e) => {
    e.preventDefault();
    if (!privacy) return alert(t("modals.messages.privacy_error"));
    setStatus("submitting");
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("success");
          setTimeout(onClose, 3000);
        },
        () => setStatus("error")
      );
  };

  if (status === "success") return <SuccessMessage onClose={onClose} t={t} />;

  // MENU
  if (step === "menu") {
    return (
      <div className="flex flex-col gap-4 min-h-[300px]">
        <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">{t("modals.menu.intro")}</p>

        <button
          onClick={() => goTo("project")}
          className="group flex items-center gap-5 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 hover:shadow-md transition-all text-left"
        >
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">{t("modals.menu.project_title")}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("modals.menu.project_desc")}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
        </button>

        <button
          onClick={() => goTo("job")}
          className="group flex items-center gap-5 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-purple-400 hover:shadow-md transition-all text-left"
        >
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
            <Briefcase className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 dark:text-white text-lg">{t("modals.menu.job_title")}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t("modals.menu.job_desc")}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-purple-500" />
        </button>

        <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center border border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t("modals.messages.direct_contact")} <br />
            <a
              href="/Contattami"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline mt-1 inline-block"
            >
              {t("modals.buttons.go_to_contacts")}
            </a>
          </p>
        </div>
      </div>
    );
  }

  const isJob = step === "job";
  const colorClass = isJob ? "purple" : "blue";
  const btnColor = isJob ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700";
  const title = isJob ? t("modals.titles.job_proposal") : t("modals.titles.project_proposal");
  const descPlaceholder = isJob ? t("modals.placeholders.description_job") : t("modals.placeholders.description");

  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col gap-4">
      <button
        onClick={() => goTo("menu")}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white mb-2 w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> {t("modals.buttons.back")}
      </button>
      <h3 className={`text-xl font-bold text-${colorClass}-600 dark:text-${colorClass}-400 mb-2`}>{title}</h3>

      <form ref={formRef} onSubmit={sendCollab} className="flex flex-col gap-4">
        <input type="hidden" name="subject" value={isJob ? "Proposta: Offerta Lavoro" : "Proposta: Nuovo Progetto"} />
        <div className="grid md:grid-cols-2 gap-4">
          <InputGroup
            name="user_name"
            label={`${t("modals.labels.name")} *`}
            placeholder={t("modals.placeholders.name")}
          />
          <InputGroup
            name="user_email"
            label={`${t("modals.labels.email")} *`}
            type="email"
            placeholder={t("modals.placeholders.email")}
          />
        </div>
        {isJob && (
          <div className="grid md:grid-cols-2 gap-4">
            <InputGroup name="company" label={t("modals.labels.company")} />
            <InputGroup name="job_position" label={t("modals.labels.position")} />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
            {isJob ? t("modals.labels.description_job") : t("modals.labels.description")} *
          </label>
          <textarea
            name="message"
            required
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 outline-none h-28"
            placeholder={descPlaceholder}
          ></textarea>
        </div>
        {!isJob && (
          <div className="grid md:grid-cols-2 gap-4">
            <InputGroup
              name="timeline"
              label={t("modals.labels.timeline")}
              placeholder={t("modals.placeholders.timeline")}
            />
            <InputGroup name="budget" label={t("modals.labels.budget")} placeholder={t("modals.placeholders.budget")} />
          </div>
        )}
        <PrivacyCheckbox checked={privacy} onChange={setPrivacy} color={colorClass} t={t} />
        <button
          disabled={status === "submitting"}
          className={`w-full py-4 rounded-xl text-white font-bold shadow-lg transition-all disabled:opacity-70 ${btnColor}`}
        >
          {status === "submitting" ? t("modals.buttons.sending") : t("modals.buttons.send_proposal")}
        </button>
      </form>
    </motion.div>
  );
}

// --- HELPER COMPONENTI (Adattati per Dark Mode e i18n) ---
const SuccessMessage = ({ onClose, t }) => (
  <div className="flex flex-col items-center justify-center text-center py-10 h-full">
    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{t("modals.titles.success")}</h3>
    <p className="text-slate-500 dark:text-slate-400 mt-2 mb-6">{t("modals.messages.success_text")}</p>
    <button
      onClick={onClose}
      className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
    >
      {t("modals.buttons.close")}
    </button>
  </div>
);

const InputGroup = ({ label, type = "text", placeholder, name }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-bold text-slate-700 dark:text-slate-200">{label}</label>
    <input
      type={type}
      name={name}
      required
      className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 outline-none transition-all"
      placeholder={placeholder}
    />
  </div>
);

const SelectGroup = ({ label, options, defaultValue = "", name, translationPrefix, t }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-bold text-slate-700 dark:text-slate-200">{label}</label>
    <div className="relative">
      <select
        name={name}
        className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 outline-none appearance-none"
        defaultValue={defaultValue}
      >
        <option value="" disabled>
          {t("modals.placeholders.select")}
        </option>
        {options.map((optKey) => (
          <option key={optKey} value={optKey}>
            {translationPrefix ? t(`${translationPrefix}.${optKey}`) : optKey}
          </option>
        ))}
      </select>
    </div>
  </div>
);

const PrivacyCheckbox = ({ checked, onChange, color = "blue", t }) => (
  <div className="flex items-start gap-2 mt-2">
    <input
      type="checkbox"
      required
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className={`mt-1 accent-${color}-600`}
    />
    <label className="text-xs text-slate-500 dark:text-slate-400">
      {t("modals.messages.privacy_label")}{" "}
      <a
        href="https://www.iubenda.com/privacy-policy/49778459"
        target="_blank"
        rel="noopener noreferrer"
        className={`underline text-${color}-600 dark:text-${color}-400`}
      >
        Privacy Policy
      </a>
      .
    </label>
  </div>
);

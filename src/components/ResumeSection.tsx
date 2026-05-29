import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Download, ExternalLink, FileText, Languages } from "lucide-react";
import { getResumeUrl, resumes, type ResumeLanguage } from "@/data/resumes";

const languageTabs: ResumeLanguage[] = ["IT", "EN"];

const ResumeSection = () => {
  const [language, setLanguage] = useState<ResumeLanguage>("IT");

  const visibleResumes = useMemo(
    () => resumes.filter((resume) => resume.language === language),
    [language]
  );

  return (
    <section id="cv" className="py-24 px-6 bg-section-light relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
              Curriculum
            </p>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 text-foreground">
              Scegli il <span className="text-primary italic">CV giusto</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-7">
              Ho preparato più versioni del curriculum perché non tutte le opportunità cercano le stesse cose.
              Scegli quella più vicina al ruolo o al progetto che hai in mente.
            </p>

            <div className="mb-7 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <p className="text-xs font-body uppercase tracking-[0.22em] text-primary mb-2">
                Scelta rapida
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full-Stack se ti interessa la parte tecnica, Frontend & Web Design per UI e siti responsive,
                Office per ruoli amministrativi e supporto operativo.
              </p>
            </div>

            <div className="inline-flex p-1 bg-card border border-border rounded-lg">
              {languageTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setLanguage(tab)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-display font-semibold transition-colors ${
                    language === tab
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={language === tab}
                >
                  <Languages className="w-4 h-4" />
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {visibleResumes.map((resume, index) => (
              <motion.article
                key={`${resume.title}-${resume.language}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex min-h-[320px] flex-col bg-card border border-border rounded-lg p-5 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow] duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <resume.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/70 border border-border/70 text-xs text-muted-foreground font-body">
                    <FileText className="w-3.5 h-3.5" />
                    PDF
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground leading-tight mb-2">
                  {resume.title}
                </h3>
                <p className="text-sm font-body text-muted-foreground leading-relaxed mb-5">
                  {resume.focus}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {resume.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary/70 mt-0.5 shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={getResumeUrl(resume.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm font-display font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Apri
                  </a>
                  <a
                    href={getResumeUrl(resume.file)}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-display font-semibold text-primary-foreground hover:shadow-md hover:shadow-primary/20 transition-shadow"
                  >
                    <Download className="w-4 h-4" />
                    Scarica
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;

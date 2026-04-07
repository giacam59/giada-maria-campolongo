import { motion } from "framer-motion";
import { Brain, Briefcase, Building2, Vote } from "lucide-react";

const experiences = [
  {
    period: "2026 – in corso",
    role: "Data Annotator",
    company: "Outlier (Progetto Aether)",
    description:
      "Annotazione e revisione di dati multimodali per l'addestramento di modelli AI generativa. Valutazione qualitativa delle risposte generate e sviluppo di pensiero critico applicato alla valutazione di output AI.",
    icon: Brain,
    current: true,
  },
  {
    period: "Nov 2025 – in corso",
    role: "Segretaria d'ufficio",
    company: "ALGECO Power",
    description:
      "Gestione autonoma delle comunicazioni, utilizzo avanzato di Excel, pianificazione delle attività operative e utilizzo quotidiano di CRM aziendali per il coordinamento con i team operativi.",
    icon: Building2,
    current: true,
  },
  {
    period: "Giu 2025 – Ott 2025",
    role: "Back-office commerciale",
    company: "SELEKTA",
    description:
      "Gestione chiamate outbound e supporto telefonico clienti, finalizzazione di pratiche contrattuali e utilizzo di CRM aziendali per il monitoraggio e la reportistica interna.",
    icon: Briefcase,
    current: false,
  },
  {
    period: "Giu 2024",
    role: "Scrutatrice di seggio",
    company: "Elezioni Europee",
    description:
      "Supporto alle operazioni di voto e scrutinio nel rispetto delle procedure istituzionali, verifica identità elettori e compilazione verbali ufficiali.",
    icon: Vote,
    current: false,
  },
];

const ExperienceSection = () => {
  return (
    <section id="esperienze" className="py-24 px-6 bg-section-light">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
            Esperienza
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-foreground">
            Percorso <span className="italic text-primary">professionale</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border md:left-[23px]" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-14 md:pl-16 group"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-1 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border-2 z-10 transition-colors ${
                    exp.current
                      ? "bg-background border-primary before:absolute before:inset-[2px] before:rounded-[0.6rem] before:bg-primary/10"
                      : "bg-card border-border group-hover:border-primary/40"
                  }`}
                >
                  <exp.icon
                    className={`w-5 h-5 ${exp.current ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors"}`}
                  />
                </div>

                <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-body px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                      {exp.period}
                    </span>
                    {exp.current && (
                      <span className="text-xs font-body px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        Attuale
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-body text-primary font-medium mb-3">{exp.company}</p>
                  <p className="text-muted-foreground font-body leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

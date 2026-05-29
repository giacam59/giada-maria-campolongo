import { motion } from "framer-motion";
import { Brain, Briefcase, Building2, Vote, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    period: "2026",
    role: "Data Annotator",
    company: "Outlier",
    description:
      "Ho valutato risposte generate da AI, controllando contenuti, ragionamento e coerenza. È stato un lavoro molto utile per allenare precisione e pensiero critico.",
    highlights: [
      "Ho lavorato con testi, codice e ragionamento logico",
      "Valutavo risposte AI seguendo rubriche e criteri in evoluzione",
      "Ho sviluppato un occhio critico che uso anche quando progetto interfacce",
    ],
    result: "Ho imparato a leggere con più attenzione e a motivare meglio le mie valutazioni",
    icon: Brain,
    current: false,
  },
  {
    period: "Nov 2025 – in corso",
    role: "Segretaria d'ufficio",
    company: "ALGECO Power",
    description:
      "Mi occupo di segreteria, documenti, email, Excel e supporto operativo. In parallelo ho proposto un nuovo prototipo per il sito aziendale e l'ho sviluppato in React.",
    highlights: [
      "Gestione quotidiana di documenti, email e attività amministrative",
      "Prototipo del nuovo sito aziendale sviluppato in React",
      "Uso di Excel e organizzazione dati per supportare il lavoro interno",
    ],
    result: "Ho unito lavoro d'ufficio e sviluppo web in un progetto nato da un bisogno reale",
    icon: Building2,
    current: true,
  },
  {
    period: "Giu 2025 – Ott 2025",
    role: "Back-office commerciale",
    company: "SELEKTA",
    description:
      "Ho gestito chiamate, pratiche e CRM in un contesto commerciale. Non era il mio punto d'arrivo, ma mi ha insegnato tanto su comunicazione, ritmo e precisione.",
    highlights: [
      "Ho parlato con decine di persone ogni giorno",
      "Ho imparato la precisione documentale (utile anche nel codice)",
      "Ho rafforzato metodo, ascolto e lavoro in team",
    ],
    result: "Sono diventata più sicura nel parlare con le persone e nel seguire procedure precise",
    icon: Briefcase,
    current: false,
  },
  {
    period: "Giu 2024",
    role: "Scrutatrice di seggio",
    company: "Elezioni Europee",
    description:
      "Ho supportato le operazioni di voto per due giorni, occupandomi anche di verbali e controlli. Un'esperienza breve, ma molto concreta.",
    highlights: [
      "La prima volta che ho avuto una responsabilità istituzionale",
      "Ho compilato verbali ufficiali senza fare un errore",
    ],
    result: "Ho gestito documenti ufficiali con attenzione e senso di responsabilità",
    icon: Vote,
    current: false,
  },
];

const ExperienceSection = () => {
  return (
    <section id="esperienze" className="py-28 px-6 bg-section-light relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
            Esperienza
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-foreground">
            La strada{" "}
            <span className="text-primary italic">fin qui</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl text-lg mb-14 leading-relaxed">
            Ogni esperienza mi ha lasciato qualcosa: più metodo, più attenzione ai dettagli e più consapevolezza di come si lavora con le persone.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-[23px] top-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:left-[27px]"
          />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-16 md:pl-20 group"
              >
                {/* Timeline dot with pulse */}
                <div className="absolute left-0 top-2">
                  {exp.current && (
                    <div className="absolute inset-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 animate-ping" style={{ animationDuration: "3s" }} />
                  )}
                  <div
                    className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center z-10 transition-all duration-300 ${
                      exp.current
                      ? "bg-card border-2 border-primary/30 shadow-md shadow-primary/5"
                      : "bg-card border border-border group-hover:border-primary/30"
                    }`}
                  >
                    <exp.icon
                      className={`w-5 h-5 md:w-6 md:h-6 ${exp.current ? "text-primary" : "text-muted-foreground group-hover:text-primary transition-colors"}`}
                    />
                  </div>
                </div>

                <motion.div
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="bg-card rounded-2xl border border-border p-6 md:p-7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow] duration-500 cursor-default"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-body px-3 py-1 rounded-full bg-muted/50 text-muted-foreground border border-border/50">
                      {exp.period}
                    </span>
                    {exp.current && (
                      <span className="text-xs font-body px-3 py-1 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                        Attuale
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-body text-primary font-semibold mb-3">{exp.company}</p>
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">{exp.description}</p>
                  <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                    <p className="text-xs font-body uppercase tracking-[0.18em] text-primary mb-1">
                      Risultato
                    </p>
                    <p className="text-sm font-body text-foreground">
                      {exp.result}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

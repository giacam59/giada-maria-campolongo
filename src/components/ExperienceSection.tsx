import { motion } from "framer-motion";
import { Brain, Briefcase, Building2, Vote, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    period: "2026",
    role: "Data Annotator",
    company: "Outlier",
    description:
      "Qui ho scoperto il mondo dell'AI da dietro le quinte: rivedevo dati, valutavo risposte generate e aiutavo i modelli a diventare più intelligenti. È stata un'esperienza che mi ha fatto pensare tantissimo — e mi ha insegnato a essere critica in modo costruttivo.",
    highlights: [
      "Ho lavorato con testi, codice e ragionamento logico",
      "Valutavo le risposte AI con criteri che cambiavano spesso (il bello era adattarsi)",
      "Ho sviluppato un occhio critico che uso ancora oggi nel mio codice",
    ],
    icon: Brain,
    current: false,
  },
  {
    period: "Nov 2025 – in corso",
    role: "Segretaria d'ufficio",
    company: "ALGECO Power",
    description:
      "Il mio primo lavoro \"vero\". Gestisco email, organizzo documenti, uso Excel come se fosse un'estensione del mio cervello. E quando hanno avuto bisogno di un sito nuovo? Ho alzato la mano e ho iniziato a costruirlo in React.",
    highlights: [
      "Ho imparato a gestire mille cose contemporaneamente",
      "Mi sono proposta per costruire il nuovo sito aziendale (in React!)",
      "Excel è diventato il mio migliore amico",
    ],
    icon: Building2,
    current: true,
  },
  {
    period: "Giu 2025 – Ott 2025",
    role: "Back-office commerciale",
    company: "SELEKTA",
    description:
      "Chiamate, pratiche, CRM. Non era il lavoro dei miei sogni, ma mi ha insegnato a comunicare con le persone, a essere precisa e a lavorare sotto pressione. Cose che uso ogni giorno anche quando scrivo codice.",
    highlights: [
      "Ho parlato con decine di persone ogni giorno",
      "Ho imparato la precisione documentale (utile anche nel codice)",
      "Ho capito cosa significa lavorare in team sul serio",
    ],
    icon: Briefcase,
    current: false,
  },
  {
    period: "Giu 2024",
    role: "Scrutatrice di seggio",
    company: "Elezioni Europee",
    description:
      "Una di quelle esperienze che fai una volta e ti rimangono. Due giorni intensi, pieni di responsabilità e attenzione ai dettagli.",
    highlights: [
      "La prima volta che ho avuto una responsabilità istituzionale",
      "Ho compilato verbali ufficiali senza fare un errore",
    ],
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
            Non ho seguito un percorso lineare, ma ogni esperienza mi ha dato qualcosa. Ecco le tappe più importanti.
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

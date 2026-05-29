import { motion } from "framer-motion";
import { BrainCircuit, FileText, LayoutTemplate, MessagesSquare, Route, WandSparkles } from "lucide-react";

const contributions = [
  {
    icon: Route,
    title: "Metto ordine prima di costruire",
    text: "Prima di partire cerco di capire cosa serve davvero: obiettivi, contenuti, priorità e vincoli.",
  },
  {
    icon: LayoutTemplate,
    title: "Rendo le informazioni scansionabili",
    text: "Organizzo testi, sezioni e componenti in modo che chi legge trovi subito quello che cerca.",
  },
  {
    icon: WandSparkles,
    title: "Trasformo idee in prototipi",
    text: "Quando un'idea è ancora vaga, mi piace darle una prima forma concreta e navigabile.",
  },
  {
    icon: FileText,
    title: "Tengo pulita la parte operativa",
    text: "Documenti, dati, email e piccoli passaggi pratici restano ordinati e facili da riprendere.",
  },
  {
    icon: BrainCircuit,
    title: "Valuto con spirito critico",
    text: "Controllo coerenza, qualità e dettagli con calma, sia quando leggo contenuti sia quando scrivo codice.",
  },
];

const softSkills = [
  "Precisione",
  "Apprendimento rapido",
  "Organizzazione",
  "Comunicazione",
  "Adattabilità",
  "Problem solving",
];

const ValueSection = () => {
  return (
    <section id="valore" className="py-24 px-6 bg-section-light relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
            Modo di lavorare
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 text-foreground">
            Prima capisco, poi <span className="text-primary italic">costruisco</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl text-lg leading-relaxed">
            Al di là degli strumenti, lavoro meglio quando posso capire il problema, mettere ordine
            e poi trasformare tutto in qualcosa di chiaro e utilizzabile.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-6 items-stretch">
          <div className="grid sm:grid-cols-2 gap-4">
            {contributions.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="bg-foreground text-primary-foreground rounded-lg p-6 flex flex-col justify-between overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-accent/95" />
            <div className="relative z-10">
              <div className="w-11 h-11 rounded-lg bg-white/12 border border-white/15 flex items-center justify-center mb-5">
                <MessagesSquare className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">
                Come si vede nel lavoro
              </h3>
              <p className="text-sm leading-relaxed text-primary-foreground/80 mb-6">
                Precisione, organizzazione e voglia di imparare non sono solo parole da CV:
                sono il modo in cui affronto le cose ogni giorno.
              </p>
              <div className="flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-md bg-white/10 border border-white/15 text-xs font-body"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;

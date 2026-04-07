import { motion } from "framer-motion";
import { Heart, Target, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Orientata agli obiettivi",
    desc: "Mi piace lavorare con metodo, rispettare le scadenze e portare risultati concreti.",
  },
  {
    icon: Zap,
    title: "Apprendimento rapido",
    desc: "Ho imparato a sviluppare in React e TypeScript in autonomia, partendo da zero.",
  },
  {
    icon: Heart,
    title: "Attenzione al dettaglio",
    desc: "Dal pixel perfetto al codice pulito, curo ogni aspetto del lavoro.",
  },
];

const AboutSection = () => {
  return (
    <section id="chi-sono" className="py-24 px-6 bg-section-alt">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">Chi sono</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Passione per il <span className="italic text-primary">digitale</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-muted-foreground font-body leading-relaxed text-lg">
            Appassionata di informatica con solido background tecnico assimilato in autonomia.
            Diplomata al Liceo Elsa Morante di Napoli con indirizzo economico-sociale e voto{" "}
            <span className="text-primary font-semibold">100/100</span>. Nel tempo libero
            mi dedico allo sviluppo frontend, esplorando nuove tecnologie e curando ogni dettaglio
            dei miei progetti.
          </p>
        </motion.div>

        {/* Values cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {values.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-5 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          <div className="px-6 py-4 bg-card rounded-xl border border-border flex items-center gap-4">
            <span className="text-2xl">🇮🇹</span>
            <div>
              <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">Italiano</p>
              <p className="font-display font-semibold text-foreground">Madrelingua</p>
            </div>
          </div>
          <div className="px-6 py-4 bg-card rounded-xl border border-border flex items-center gap-4">
            <span className="text-2xl">🇬🇧</span>
            <div>
              <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">Inglese</p>
              <p className="font-display font-semibold text-foreground">B2 – Intermedio avanzato</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

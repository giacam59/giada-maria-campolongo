import { motion } from "framer-motion";
import { Lightbulb, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Lightbulb,
    title: "Mi faccio un sacco di domande",
    desc: "Prima di scrivere una riga di codice, cerco di capire davvero il problema. Chi userà questo sito? Cosa deve fare? Cosa già esiste là fuori?",
  },
  {
    num: "02",
    icon: PenTool,
    title: "Schizzo, provo, cambio idea",
    desc: "Disegno wireframe, faccio mockup, chiedo pareri. A volte butto tutto e ricomincio. Fa parte del processo.",
  },
  {
    num: "03",
    icon: Code2,
    title: "Scrivo codice (e lo riscrivo)",
    desc: "React, TypeScript, componenti modulari. Testo su mobile, su desktop, sul telefono di mia madre. Se funziona ovunque, sono felice.",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Online e poi si migliora",
    desc: "Pubblico, controllo le performance, sistemo i bug. Un sito non è mai \"finito\" — è solo alla versione attuale.",
  },
];

const ApproachSection = () => {
  return (
    <section className="py-28 px-6 bg-section-alt relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
            Metodo
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Come <span className="text-primary italic">lavoro</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl text-lg mb-14 leading-relaxed">
            Non ho un metodo da manuale, ma col tempo ho trovato il mio modo di fare le cose. Più o meno funziona così:
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="relative p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow] duration-500 group"
            >
              {/* Step number background */}
              <span className="absolute top-4 right-4 text-5xl font-display font-bold text-primary/[0.06] select-none">
                {step.num}
              </span>

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-all duration-300">
                <step.icon className="w-5 h-5 text-primary" />
              </div>

              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">
                {step.desc}
              </p>

              {/* Connector line (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;

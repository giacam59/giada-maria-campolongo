import { motion, useInView } from "framer-motion";
import { Heart, Target, Zap, GraduationCap, Code, Palette, Music, BookOpen, Coffee, Sparkles } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const values = [
  {
    icon: Target,
    title: "Autodidatta convinta",
    desc: "Quasi tutto quello che so l'ho imparato da sola, a forza di tutorial, documentazione e tanta ostinazione.",
  },
  {
    icon: Zap,
    title: "Mai ferma",
    desc: "Se non sto imparando qualcosa di nuovo, probabilmente sto dormendo. O forse neanche quello.",
  },
  {
    icon: Heart,
    title: "Maniaca dei dettagli",
    desc: "Allineo pixel, sistemo spaziature, riscrivo codice tre volte. Lo so, è un problema. Ma anche un superpotere.",
  },
];

const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const AboutSection = () => {
  return (
    <section id="chi-sono" className="py-28 px-6 bg-section-alt relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">Chi sono</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Un po' di{" "}
            <span className="text-primary italic">me</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-muted-foreground font-body leading-relaxed text-lg">
            Mi chiamo Giada, ho vent'anni e vengo da Napoli. Mi sono diplomata al Liceo Elsa Morante
            con indirizzo economico-sociale e un voto di{" "}
            <span className="text-primary font-semibold">100/100</span> (sì, ne vado fiera).
            Il web è diventato la mia passione quasi per caso: ho iniziato a smanettare con HTML per curiosità,
            e da lì non mi sono più fermata. Oggi studio Web Design, lavoro come Data Annotator per l'AI,
            e nel tempo libero costruisco cose con React e TypeScript — tipo questo sito.
          </p>
        </motion.div>

        {/* Fun facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: "🎓", suffix: "", label: "Diploma 100/100" },
            { value: "💻", suffix: "", label: "Autodidatta dal 2023" },
            { value: "☕", suffix: "", label: "Alimentata a caffè" },
            { value: "🚀", suffix: "", label: "Sempre un progetto in corso" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 bg-card rounded-2xl border border-border group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
            >
              <p className="text-3xl mb-2">
                {stat.value}
              </p>
              <p className="text-sm font-body text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Values cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-16">
          {values.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-card rounded-2xl border border-border group cursor-default hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow] duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">{item.title}</h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Interests & Passions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground">Cosa mi appassiona</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { icon: Code, label: "Sviluppo web" },
              { icon: Palette, label: "UI/UX Design" },
              { icon: Music, label: "Musica" },
              { icon: BookOpen, label: "Formazione continua" },
              { icon: Coffee, label: "Problem solving" },
              { icon: Heart, label: "Progetti creativi" },
            ].map((interest, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="flex flex-col items-center gap-2 p-4 bg-card rounded-2xl border border-border cursor-default hover:border-primary/30 hover:shadow-md transition-[border-color,box-shadow] duration-500 group"
              >
                <interest.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs font-body text-muted-foreground group-hover:text-foreground transition-colors text-center">{interest.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 pl-6 border-l-4 border-primary/30"
        >
          <p className="text-lg md:text-xl font-display italic text-foreground/80 leading-relaxed">
            "Il bello di questo mestiere è che non smetti mai di sentirti una principiante — e a me questa cosa piace un sacco."
          </p>
        </motion.blockquote>

        {/* Education + Languages */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-card rounded-2xl border border-border"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground">Formazione</h3>
            </div>
            <div className="space-y-4">
              <div className="pl-4 border-l-2 border-primary/30">
                <p className="font-display font-semibold text-foreground">Diploma di II grado</p>
                <p className="text-sm text-muted-foreground">I.S. Liceo Elsa Morante, Napoli</p>
                <p className="text-sm text-muted-foreground">Indirizzo economico-sociale • <span className="text-primary font-semibold">100/100</span></p>
              </div>
              <div className="pl-4 border-l-2 border-primary/30">
                <p className="font-display font-semibold text-foreground">Corso Web Design</p>
                <p className="text-sm text-muted-foreground">Agenzia Formativa Dante Alighieri S.R.L.</p>
                <p className="text-sm text-primary">2024 – in corso</p>
              </div>
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🇮🇹</span>
                <div className="flex-1">
                  <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">Italiano</p>
                  <p className="font-display font-semibold text-foreground">Madrelingua</p>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(n => (
                    <div key={n} className="w-2 h-6 rounded-full bg-primary" />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 group">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🇬🇧</span>
                <div className="flex-1">
                  <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">Inglese</p>
                  <p className="font-display font-semibold text-foreground">B2 – Intermedio avanzato</p>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4].map(n => (
                    <div key={n} className="w-2 h-6 rounded-full bg-primary" />
                  ))}
                  <div className="w-2 h-6 rounded-full bg-muted" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

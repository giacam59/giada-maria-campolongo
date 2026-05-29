import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Code, Palette, Music, BookOpen, Coffee, Heart } from "lucide-react";

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

        {/* Two-column: text + decorative side */}
        <div className="grid md:grid-cols-5 gap-12 mb-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3 space-y-6"
          >
            <p className="text-muted-foreground font-body leading-relaxed text-lg">
              Mi chiamo Giada, ho vent'anni e vengo da Napoli. Mi sono diplomata al Liceo Elsa Morante
              con indirizzo economico-sociale e un voto di{" "}
              <span className="text-primary font-semibold">100/100</span>. Oggi vivo a Torino,
              studio Web Design e sto cercando di costruire un profilo che tenga insieme codice,
              cura visuale e precisione nel lavoro di tutti i giorni.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed text-lg">
              Ho iniziato dal web per curiosità. Poi React, TypeScript e UI design sono diventati
              il posto in cui mi piace sperimentare. Il lavoro d'ufficio, invece, mi ha insegnato
              a gestire priorità, documenti e persone senza perdere il filo.
            </p>
            <p className="text-muted-foreground font-body leading-relaxed text-lg">
              Mi piacciono le cose fatte con attenzione: interfacce leggibili, file ordinati,
              comunicazione chiara e piccoli miglioramenti continui. Imparo in fretta, faccio domande
              e preferisco costruire qualcosa di solido prima di aggiungere il superfluo.
            </p>
          </motion.div>

          {/* Decorative side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-2 hidden md:flex flex-col items-center justify-center gap-5"
          >
            <div className="relative w-full aspect-square max-w-[280px]">
              {/* Decorative blobs */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/40 to-primary/5 rotate-3" />
              <div className="absolute inset-2 rounded-3xl bg-card border border-border p-6 -rotate-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    about.tsx
                  </div>
                  <div className="font-mono text-xs text-muted-foreground/70 space-y-1.5">
                    <p><span className="text-primary/70">const</span> giada = {"{"}</p>
                    <p className="pl-4">città: <span className="text-primary">"Napoli → Torino"</span>,</p>
                    <p className="pl-4">focus: <span className="text-primary">"frontend + operatività"</span>,</p>
                    <p className="pl-4">mood: <span className="text-primary">"curiosa, precisa"</span>,</p>
                    <p className="pl-4">stack: <span className="text-primary">"React, TS, UI"</span>,</p>
                    <p>{"}"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-primary/40"
                  />
                  <span className="text-[10px] font-body text-muted-foreground/60">in crescita, con metodo</span>
                </div>
              </div>
            </div>
          </motion.div>
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
            "Mi piace quando una cosa complicata diventa più chiara: una schermata più leggibile, un file più ordinato, un passaggio in meno da spiegare."
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
                <p className="text-sm text-primary">2024 – 2026</p>
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

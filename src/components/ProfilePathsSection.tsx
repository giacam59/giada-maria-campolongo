import { motion } from "framer-motion";
import { BriefcaseBusiness, Code2, Palette } from "lucide-react";

const profiles = [
  {
    icon: Code2,
    title: "Full-Stack Developer",
    summary:
      "La direzione per i ruoli tecnici junior: frontend, logica, componenti React e voglia di capire come un progetto arriva online.",
    points: ["React e TypeScript", "Progetti end-to-end", "Backend leggero e integrazioni"],
  },
  {
    icon: Palette,
    title: "Frontend Developer & Web Designer",
    summary:
      "La parte in cui unisco codice e gusto visivo: pagine responsive, gerarchie chiare e dettagli curati senza complicare l'esperienza.",
    points: ["UI responsive", "Wireframe e prototipi", "Design system essenziali"],
  },
  {
    icon: BriefcaseBusiness,
    title: "Office Administrator",
    summary:
      "Il lato più operativo del mio percorso: email, documenti, Excel, CRM e supporto al team, con attenzione a ordine e precisione.",
    points: ["Back office", "Excel e documenti", "Comunicazione con clienti e team"],
  },
];

const ProfilePathsSection = () => {
  return (
    <section id="profili" className="py-24 px-6 bg-section-alt relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-primary/[0.04] rounded-full blur-[140px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
            Profili professionali
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-5 text-foreground">
            Tre strade, la stessa <span className="text-primary italic">attenzione</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl text-lg leading-relaxed">
            Ho preparato CV diversi perché non tutto il mio percorso entra in una sola etichetta.
            Qui trovi le tre direzioni principali, così è più facile capire dove potrei inseririmi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {profiles.map((profile, index) => (
            <motion.article
              key={profile.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow] duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                <profile.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-foreground mb-3">
                {profile.title}
              </h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed mb-5">
                {profile.summary}
              </p>
              <div className="flex flex-wrap gap-2">
                {profile.points.map((point) => (
                  <span
                    key={point}
                    className="px-3 py-1.5 rounded-md bg-muted/70 border border-border/70 text-xs font-body text-muted-foreground"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePathsSection;

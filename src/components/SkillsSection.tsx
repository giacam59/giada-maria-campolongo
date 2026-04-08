import { motion } from "framer-motion";
import { Code2, PenTool, Wrench } from "lucide-react";

type SkillCategory = {
  title: string;
  description: string;
  icon: typeof Code2;
  color: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Sviluppo Web",
    description: "Il mio pane quotidiano. Ho iniziato con HTML e CSS, poi è arrivato JavaScript e non sono più tornata indietro. Da poco sto esplorando anche Python per scripting e automatizzazioni.",
    icon: Code2,
    color: "bg-primary/10 text-primary border-primary/20",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Python", "Vite", "Tailwind CSS"],
  },
  {
    title: "Design & Multimedia",
    description: "Mi piace che le cose siano belle. Photoshop, Illustrator e Canva sono i miei compagni creativi.",
    icon: PenTool,
    color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    skills: ["Photoshop", "Illustrator", "Premiere Pro", "Canva", "UI Design"],
  },
  {
    title: "Strumenti del mestiere",
    description: "Excel, CRM, Git... tutto quello che serve a non perdersi nel caos di un progetto (o di un ufficio).",
    icon: Wrench,
    color: "bg-amber-600/10 text-amber-700 border-amber-600/20",
    skills: ["Microsoft Office", "Excel avanzato", "CRM", "Git", "Navigazione web"],
  },
];

const SkillsSection = () => {
  return (
    <section id="competenze" className="py-28 px-6 bg-section-alt relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
            Competenze
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Cosa so <span className="text-primary italic">fare</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl text-lg mb-14 leading-relaxed">
            Non sono una tuttofare, ma le cose che so le so bene (e quelle che non so, le sto imparando).
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-[border-color,box-shadow] duration-500 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-all duration-300">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">{cat.title}</h3>
              </div>
              <p className="text-sm font-body text-muted-foreground mb-5 leading-relaxed">{cat.description}</p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: j * 0.05 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className={`px-3.5 py-2 rounded-full text-sm font-body border cursor-default transition-shadow hover:shadow-md ${cat.color}`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default SkillsSection;

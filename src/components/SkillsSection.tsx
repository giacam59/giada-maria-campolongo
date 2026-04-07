import { motion } from "framer-motion";
import { Code2, PenTool, Wrench } from "lucide-react";

type SkillCategory = {
  title: string;
  icon: typeof Code2;
  color: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Sviluppo Web",
    icon: Code2,
    color: "bg-primary/10 text-primary border-primary/20",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Vite"],
  },
  {
    title: "Design & Multimedia",
    icon: PenTool,
    color: "bg-orange-400/10 text-orange-500 border-orange-400/20",
    skills: ["Photoshop", "Illustrator", "Premiere Pro", "Canva"],
  },
  {
    title: "Strumenti & Altro",
    icon: Wrench,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    skills: ["Microsoft Office", "Excel avanzato", "CRM", "Git"],
  },
];

const SkillsSection = () => {
  return (
    <section id="competenze" className="py-24 px-6 bg-section-alt">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
            Competenze
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-foreground">
            Le mie <span className="italic text-primary">skill</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: j * 0.05 + i * 0.1 }}
                    className={`px-3 py-1.5 rounded-full text-sm font-body border ${cat.color}`}
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

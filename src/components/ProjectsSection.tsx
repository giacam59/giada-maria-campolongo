import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import micromihai from "@/assets/project-micromihai.png";
import algecopower from "@/assets/project-algecopower.png";
import { useRef } from "react";

const projects = [
  {
    title: "Micromihai",
    role: "Idea, design e codice — tutto mio",
    description:
      "Un amico artista aveva bisogno di un sito. Ho colto l'occasione al volo: React, TypeScript, multilingua, animazioni, notifiche Telegram... è il progetto dove ho messo dentro tutto quello che sapevo (e ho imparato un sacco di cose nuove).",
    highlights: [
      "Tre lingue: italiano, inglese e rumeno",
      "Backend serverless con Netlify Functions",
      "Form contatti che mi avvisa su Telegram",
      "Performance Lighthouse sopra il 95",
    ],
    image: micromihai,
    url: "https://micromihai.com",
    tags: ["React", "TypeScript", "i18next", "Netlify Functions"],
  },
  {
    title: "ALGECO Power",
    role: "Nato da un'idea in ufficio",
    description:
      "Quando ho visto il sito della mia azienda, ho pensato: \"posso fare di meglio\". Così ho progettato e sviluppato un prototipo completamente nuovo, da zero, durante il tempo libero.",
    highlights: [
      "Design system creato da zero",
      "Prima volta con un progetto mobile-first completo",
      "Ho imparato a pensare in termini di UX reale",
      "Il mio capo è rimasto impressionato (vittoria!)",
    ],
    image: algecopower,
    url: "https://algecopower.netlify.app",
    tags: ["React", "TypeScript", "Web Design", "Responsive"],
  },
];

const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };

const ProjectCard = ({ project, index }: { project: typeof projects[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rawRotateX = useTransform(mouseY, [-150, 150], [3, -3]);
  const rawRotateY = useTransform(mouseX, [-150, 150], [-3, 3]);
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-3d group h-full"
    >
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ rotateX, rotateY }}
        className="flex flex-col h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-[border-color,box-shadow] duration-500 relative"
      >
        {project.image ? (
          <div className="relative overflow-hidden">
            <img
              src={project.image}
              alt={`Screenshot di ${project.title}`}
              className="w-full aspect-video object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border shadow-lg">
                <ExternalLink className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden aspect-video bg-gradient-to-br from-secondary/50 to-card flex items-center justify-center">
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: "linear-gradient(hsl(20 15% 15%) 1px, transparent 1px), linear-gradient(90deg, hsl(20 15% 15%) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }} />
            <span className="text-5xl font-display font-bold text-primary/15 group-hover:text-primary/25 transition-colors">{project.title}</span>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border shadow-lg">
                <ExternalLink className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="p-7 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xl md:text-2xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <p className="text-xs font-body text-primary font-medium mb-3">{project.role}</p>
          <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
            {project.description}
          </p>
          <ul className="space-y-1.5 mb-5 flex-1">
            {project.highlights.map((h, j) => (
              <li key={j} className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                <Star className="w-3 h-3 text-primary/50 mt-0.5 shrink-0 fill-primary/50" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-body px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="progetti" className="py-28 px-6 bg-section-light relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.03] rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
            Progetti
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-foreground">
            Cose che ho <span className="text-primary italic">costruito</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-lg">
            Ogni progetto ha una storia dietro. Ecco quelli a cui tengo di più.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

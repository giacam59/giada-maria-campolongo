import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import micromihai from "@/assets/project-micromihai.png";

const projects = [
  {
    title: "Micromihai",
    description:
      "Sito portfolio per artista musicale con React 18, TypeScript e Vite. Multilingua (i18next), animazioni progressive, backend serverless, SEO ottimizzata e notifiche Telegram.",
    image: micromihai,
    url: "https://micromihai.com",
    tags: ["React", "TypeScript", "i18next", "Netlify Functions"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="progetti" className="py-24 px-6 bg-section-light">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-12 text-foreground">
            Progetti <span className="italic text-primary">realizzati</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg"
            >
              {project.image ? (
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={`Screenshot di ${project.title}`}
                    className="w-full aspect-video object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden aspect-video bg-secondary flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-primary/20">Portfolio</span>
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center">
                    <ExternalLink className="w-8 h-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              )}

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-sm font-body text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-body px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

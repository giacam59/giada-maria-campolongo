import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import profileImg from "@/assets/profile.jpg";
import { useState, useEffect } from "react";

const roles = [
  "Frontend Developer",
  "Web Designer",
  "Data Annotator",
  "Office Administrator",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentRole.slice(0, text.length + 1));
          if (text.length === currentRole.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setText(currentRole.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden mesh-gradient">
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="particle" />
        ))}
      </div>

      {/* Soft ambient blurs */}
      <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-[5%] w-[400px] h-[400px] bg-secondary/40 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Decorative shape */}
      <div className="absolute top-0 right-0 w-[55%] h-[65%] bg-primary/[0.04] rounded-bl-[120px] -z-0" />

      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 glass glow-border"
          >
            <span className="text-xs font-body font-medium text-foreground/80 tracking-wide">
              Sviluppo web, design e un po' di organizzazione pratica
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] mb-4 text-foreground">
            Giada Maria
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] mb-6 text-primary italic">
            Campolongo
          </h1>

          <div className="h-8 mb-8">
            <span className="text-lg md:text-xl font-body text-muted-foreground">
              {text}
            </span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-[2px] h-5 bg-primary ml-0.5 align-middle"
            />
          </div>

          <p className="text-base md:text-lg font-body text-muted-foreground max-w-lg leading-relaxed mb-10">
            Mi piace costruire interfacce pulite con React e TypeScript, ma anche tenere in ordine
            informazioni, documenti e processi. Qui trovi quello che so fare, i progetti su cui ho
            lavorato e i CV più adatti a ogni ruolo.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href="#progetti"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-shadow"
            >
              Guarda i progetti
            </motion.a>
            <motion.a
              href="#cv"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-border font-display font-semibold rounded-xl text-foreground hover:bg-card transition-colors"
            >
              <Download className="w-4 h-4" />
              Scegli CV
            </motion.a>
          </div>
        </motion.div>

        {/* Image with 3D effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        >
          <motion.div
            className="relative card-3d"
            style={{ rotateX, rotateY }}
          >
            {/* Soft shadow behind image */}
            <div className="absolute -inset-3 rounded-[2.5rem] bg-primary/10 blur-2xl opacity-50 animate-pulse-glow" />

            <div className="relative w-72 h-72 md:w-[22rem] md:h-[22rem] rounded-[2rem] overflow-hidden border-2 border-border shadow-xl">
              <img
                src={profileImg}
                alt="Giada Maria Campolongo"
                className="w-full h-full object-cover"
              />

            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 px-4 py-2 bg-card rounded-xl border border-border shadow-md"
            >
              <span className="text-sm font-display font-semibold text-primary">React</span>
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 -left-3 px-4 py-2 bg-card rounded-xl border border-border shadow-md"
            >
              <span className="text-sm font-display font-semibold text-primary">TypeScript</span>
            </motion.div>
            <motion.div
              animate={{ y: [-3, 7, -3] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-6 px-4 py-2 bg-card rounded-xl border border-border shadow-md"
            >
              <span className="text-sm font-display font-semibold text-primary">Tailwind</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#chi-sono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group"
      >
        <span className="text-xs font-body text-muted-foreground tracking-widest uppercase group-hover:text-primary transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;

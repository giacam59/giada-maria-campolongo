import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-section-light">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[60%] h-[70%] bg-primary/5 rounded-bl-[120px] -z-10" />
      <div className="absolute bottom-10 left-10 w-32 h-32 border border-primary/20 rounded-full -z-10" />
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary/30 rounded-full -z-10" />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-primary/20 rounded-full -z-10" />
      <div className="absolute top-20 left-[15%] w-48 h-48 bg-primary/[0.03] rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-20 right-[10%] w-64 h-64 bg-primary/[0.04] rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-body font-medium text-primary tracking-wide uppercase">
              Disponibile per nuovi progetti
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 text-foreground">
            Giada Maria
            <br />
            <span className="text-primary italic">Campolongo</span>
          </h1>
          <p className="text-lg md:text-xl font-body text-muted-foreground max-w-md leading-relaxed mb-8">
            Aspirante Frontend Developer & Web Designer con passione per design minimal ed eleganti
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#contatti"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-body font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Contattami
            </a>
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-border text-foreground font-body font-medium rounded-lg hover:bg-card transition-colors"
            >
              Scarica CV
            </a>
          </div>

        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-[2rem] overflow-hidden border-2 border-border shadow-lg">
              <img
                src={profileImg}
                alt="Giada Maria Campolongo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-primary/30 rounded-xl -z-10" />

          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#chi-sono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </motion.a>
    </section>
  );
};

export default HeroSection;

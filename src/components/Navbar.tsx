import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Profili", href: "#profili" },
  { label: "Esperienze", href: "#esperienze" },
  { label: "Competenze", href: "#competenze" },
  { label: "Progetti", href: "#progetti" },
  { label: "CV", href: "#cv" },
  { label: "Contatti", href: "#contatti" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-[4.5rem] flex items-center justify-between">
          <a
            href="#"
            aria-label="Torna all'inizio"
            className="group inline-flex items-center gap-3 min-w-0"
          >
            <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-lg bg-foreground text-primary-foreground shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
              <span className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent opacity-95" />
              <span className="relative font-display text-[1.05rem] font-bold tracking-normal">
                GC
              </span>
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-base font-bold text-foreground tracking-normal">
                Giada Maria Campolongo
              </span>
              <span className="mt-1 font-body text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                Web portfolio
              </span>
            </span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1 rounded-xl border border-border/70 bg-card/70 px-1.5 py-1.5 shadow-sm backdrop-blur">
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-body font-medium transition-colors group ${
                  l.href === "#cv"
                    ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/95"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                }`}
              >
                {l.label}
                {l.href !== "#cv" && (
                  <span className="absolute bottom-1 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 group-hover:w-1/2" />
                )}
              </motion.a>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative w-11 h-11 rounded-lg glass flex items-center justify-center text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Scroll progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-accent via-primary to-primary/40"
          style={{ scaleX }}
        />
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[4.5rem] left-0 right-0 z-40 glass-strong px-6 py-6 md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`block rounded-lg px-3 py-3 text-lg font-display transition-colors ${
                  l.href === "#cv"
                    ? "mb-2 bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-primary"
                }`}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

import { Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="py-12 px-6 bg-section-alt border-t border-border/30 relative">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="font-display font-bold text-xl text-foreground mb-1">
            <span className="text-primary">G</span>
            <span className="text-foreground/80">.Campolongo</span>
          </p>
          <p className="text-sm font-body text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} — Fatto con
            <Heart className="w-3 h-3 text-primary fill-primary inline" />
            a Torino
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            href="mailto:giacam2005@gmail.com"
            whileHover={{ y: -3, scale: 1.05 }}
            className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/30 hover:shadow-md transition-[border-color,box-shadow] duration-300 group"
            aria-label="Email"
          >
            <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/gm-campolongo/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, scale: 1.05 }}
            className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/30 hover:shadow-md transition-[border-color,box-shadow] duration-300 group"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ y: -3, scale: 1.05 }}
            className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/30 hover:shadow-md transition-[border-color,box-shadow] duration-300 group"
            aria-label="Torna su"
          >
            <ArrowUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

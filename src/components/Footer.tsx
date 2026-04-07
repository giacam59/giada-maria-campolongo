import { Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => (
  <footer className="py-10 px-6 bg-card border-t border-border">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-signature text-2xl text-foreground mb-1">
            Giada<span className="text-primary">.</span>C
          </p>
          <p className="text-sm font-body text-muted-foreground">
            © {new Date().getFullYear()} Giada Maria Campolongo
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:giacam2005@gmail.com"
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
          </a>
          <a
            href="https://www.linkedin.com/in/gm-campolongo/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
            aria-label="Torna su"
          >
            <ArrowUp className="w-4 h-4 text-muted-foreground hover:text-primary" />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, ArrowUpRight, FileText } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "giacam2005@gmail.com",
    href: "mailto:giacam2005@gmail.com",
    external: false,
  },
  {
    icon: Phone,
    label: "Telefono",
    value: "+39 351 941 7402",
    href: "tel:+393519417402",
    external: false,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "gm-campolongo",
    href: "https://www.linkedin.com/in/gm-campolongo/",
    external: true,
  },
  {
    icon: MapPin,
    label: "Posizione",
    value: "Torino, Italia",
    href: null,
    external: false,
  },
];

const ContactSection = () => {
  return (
    <section id="contatti" className="py-28 px-6 bg-section-alt relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-secondary/[0.5] rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">Contatti</p>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 text-foreground">
            Parliamone <span className="text-primary italic">insieme</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto text-lg">
            Se pensi che il mio profilo possa essere adatto a un ruolo o a un progetto, scrivimi pure.
          </p>
        </motion.div>

        {/* CTA big card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-card border border-border rounded-3xl p-8 md:p-12 mb-10 text-center hover:shadow-lg hover:shadow-primary/5 transition-shadow relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/30" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Vuoi capire se possiamo lavorare insieme?
            </h3>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              Posso raccontarti meglio il mio percorso, oppure indirizzarti subito al CV più adatto.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <motion.a
                href="mailto:giacam2005@gmail.com"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground font-display font-bold rounded-xl text-base hover:shadow-lg hover:shadow-primary/25 transition-shadow"
              >
                <Mail className="w-5 h-5" />
                Scrivimi
              </motion.a>
              <motion.a
                href="#cv"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-border bg-background/40 text-foreground font-display font-bold rounded-xl text-base hover:bg-card transition-colors"
              >
                <FileText className="w-5 h-5" />
                Vedi CV
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {contacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {item.href ? (
                <motion.a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-[border-color,box-shadow] duration-500 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="font-body text-foreground group-hover:text-primary transition-colors font-medium truncate">
                      {item.value}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 -translate-y-1 group-hover:translate-y-0" />
                </motion.a>
              ) : (
                <div className="flex items-center gap-4 p-5 bg-card border border-border rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="font-body text-foreground font-medium">{item.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

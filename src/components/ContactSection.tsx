import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contatti" className="py-24 px-6 bg-section-alt relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/[0.03] rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/[0.04] rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-body tracking-[0.3em] uppercase text-primary mb-3">Contatti</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Restiamo in <span className="italic text-primary">contatto</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto text-lg">
            Sei interessato a collaborare o vuoi saperne di più? Non esitare a contattarmi.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Contact cards */}
          {[
            {
              icon: Mail,
              label: "Email",
              value: "giacam2005@gmail.com",
              href: "mailto:giacam2005@gmail.com",
            },
            {
              icon: Phone,
              label: "Telefono",
              value: "+39 351 941 7402",
              href: "tel:+393519417402",
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
              value: "Napoli, Italia",
              href: null,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/40 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">{item.label}</p>
                    <p className="font-body text-foreground group-hover:text-primary transition-colors font-medium">
                      {item.value}
                    </p>
                  </div>
                  <Send className="w-4 h-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ) : (
                <div className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
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

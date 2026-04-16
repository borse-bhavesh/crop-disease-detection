import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

const ContactSection = () => (
  <section id="contact" className="py-24 bg-secondary/50">
    <div className="max-w-xl mx-auto px-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-heading mb-6"
      >
        Get in Touch
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center gap-4 text-muted-foreground font-body"
      >
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          <span>support@cropai.com</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>AgriTech Hub, Bangalore, India</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;

import { motion } from "framer-motion";

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="max-w-3xl mx-auto px-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-heading mb-6"
      >
        About CropAI
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground leading-relaxed font-body"
      >
        CropAI leverages state‑of‑the‑art deep learning to help farmers identify crop diseases
        early, reduce losses, and make data‑driven decisions. Our mission is to make precision
        agriculture accessible to everyone—from smallholder farmers to large commercial operations.
      </motion.p>
    </div>
  </section>
);

export default AboutSection;

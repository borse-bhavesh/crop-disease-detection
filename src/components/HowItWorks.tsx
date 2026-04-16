import { motion } from "framer-motion";
import { Upload, Cpu, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Take a photo of the affected crop and upload it through our simple interface.",
  },
  {
    icon: Cpu,
    title: "Analyze",
    description: "Our AI model processes the image and identifies potential diseases in seconds.",
  },
  {
    icon: FileCheck,
    title: "Results",
    description: "Get a detailed diagnosis with confidence scores and recommended treatments.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/50">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-heading text-center mb-16"
        >
          How It Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-sm font-semibold text-primary mb-2 font-body">
                Step {i + 1}
              </div>
              <h3 className="text-xl font-heading mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

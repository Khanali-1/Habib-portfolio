"use client";
import { motion } from "framer-motion";

/** Scroll-triggered fade/slide. Reduced-motion is handled globally by MotionConfig in IntroGate. */
export default function Reveal({ children, className = "", delay = 0, y = 28, x = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

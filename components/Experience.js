"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import ScrollArrow from "./ScrollArrow";
import Reveal from "./Reveal";
import { JOURNEY } from "@/lib/data";

function Item({ j, i, active, onActive }) {
  const ref = useRef(null);
  // thin band in the middle of the viewport = "this item is being read"
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => { if (inView) onActive(i); }, [inView, i, onActive]);

  const current = i === active;
  const passed = i <= active;

  return (
    <motion.li ref={ref} className="relative pl-12 sm:pl-14"
      initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <motion.span aria-hidden="true"
        className={`absolute left-0 top-7 h-4 w-4 rounded-full border-2 transition-colors duration-500 ${passed ? "border-accent bg-accent" : "border-line bg-bg"} ${current ? "timeline-glow" : ""}`}
        animate={{ scale: current ? 1.35 : 1 }} transition={{ type: "spring", stiffness: 300, damping: 18 }} />
      <motion.div
        className={`card-premium !translate-y-0 p-6 transition-[border-color,box-shadow] duration-500 ${current ? "!border-accent shadow-[0_0_44px_-12px_rgb(var(--accent-rgb)/.65)]" : ""}`}
        animate={{ scale: current ? 1.025 : 1, opacity: current ? 1 : passed ? 0.85 : 0.55 }}
        transition={{ duration: 0.45, ease: "easeOut" }}>
        <p className={`text-xs font-semibold uppercase tracking-[.2em] transition-colors ${passed ? "text-accent" : "text-muted"}`}>{j.when}</p>
        <h3 className="mt-1.5 text-lg font-semibold">{j.title}</h3>
        <p className="mt-1.5 text-sm text-muted">{j.text}</p>
      </motion.div>
    </motion.li>
  );
}

export default function Experience() {
  const listRef = useRef(null);
  const [active, setActive] = useState(-1);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="section">
      <Reveal><h2 className="h2">My Journey</h2></Reveal>
      <ol ref={listRef} className="relative mx-auto w-full max-w-3xl space-y-8 lg:mx-0">
        {/* track + progressive fill, centred on the 16px dots */}
        <span className="absolute bottom-0 left-[7px] top-0 w-0.5 rounded bg-line" aria-hidden="true" />
        <motion.span className="timeline-glow absolute bottom-0 left-[7px] top-0 w-0.5 origin-top rounded bg-gradient-to-b from-accent to-accent2"
                     style={{ scaleY: fill }} aria-hidden="true" />
        {JOURNEY.map((j, i) => <Item key={j.title} j={j} i={i} active={active} onActive={setActive} />)}
      </ol>
      <ScrollArrow next="contact" />
    </section>
  );
}

"use client";
import { motion } from "framer-motion";
import { FiDownload, FiGithub, FiLinkedin } from "react-icons/fi";
import Orbit from "./Orbit";
import OrbitCore from "./OrbitCore";
import ScrollArrow from "./ScrollArrow";
import { useIntro } from "./IntroGate";
import { HERO_ORBIT, SOCIAL } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1];
const container = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

export default function Hero() {
  const { revealed } = useIntro();
  const state = revealed ? "show" : "hidden";

  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-line ">
      {/* elevated background: glow + violet bloom + perspective grid */}
      <div className="hero-bg" aria-hidden="true"><div className="hero-grid" /></div>

      <div className="section">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-8">
          <motion.div variants={container} initial="hidden" animate={state}
                      className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.p variants={item} className="eyebrow mb-4 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-accent" aria-hidden="true" /> Hello, I’m Habib Khan
            </motion.p>
            <motion.h1 variants={item}
              className="bg-gradient-to-b from-fg to-fg/60 bg-clip-text text-5xl font-bold leading-[1.05] tracking-tight text-transparent sm:text-6xl lg:text-7xl">
              MERN Stack Developer
            </motion.h1>
            <motion.p variants={item} className="mt-6 max-w-lg text-base text-muted sm:text-lg">
  I build fast, accessible, and polished web applications, from database to interface. I create CEO-friendly, SEO-optimized websites that improve brand visibility, enhance performance, and turn ideas into meaningful digital experiences. I also focus on building modern, engaging websites that help brands grow and connect with their audience. I also develop AI-powered solutions and intelligent backend integrations that transform ideas into practical digital products, helping brands grow and succeed online.
            </motion.p>
            <motion.div variants={item} className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
              <span className="pill">Frontend Specialist</span><span className="pill">Full-Stack Development</span>
            </motion.div>
            <motion.div variants={item} className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#projects" className="btn-primary">Explore My Work</a>
              <a  href="/resume/cv.pdf" download className="btn-ghost"><FiDownload /> Download CV</a>
            </motion.div>
            <motion.div variants={item} className="mt-9 flex justify-center gap-3 lg:justify-start">
              <a href={SOCIAL.github} aria-label="GitHub" className="glass lift grid h-11 w-11 place-items-center rounded-full"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/habib-khan-28a75b436/" aria-label="LinkedIn" className="glass lift grid h-11 w-11 place-items-center rounded-full"><FiLinkedin /></a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.85, rotateX: 18 }}
                      animate={revealed ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.85, rotateX: 18 }}
                      transition={{ duration: 1.1, ease, delay: 0.2 }}>
            <Orbit items={HERO_ORBIT} size="min(88vw, 470px)" radii={["31%", "45%"]} badge="clamp(40px, 10.5vw, 54px)">
              <OrbitCore title="MERN Dev" />
            </Orbit>
          </motion.div>
        </div>
        <ScrollArrow next="about" />
      </div>
    </section>
  );
}

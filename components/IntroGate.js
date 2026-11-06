"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { SKILL_ORBIT } from "@/lib/data";

/**
 * Wraps the page. Shows a short (~5s) 3D "tech portal" welcome overlay, then reveals the site.
 * `revealed` flips to true as the overlay starts leaving, so the Hero animates in underneath it.
 */
const IntroCtx = createContext({ revealed: true });
export const useIntro = () => useContext(IntroCtx);

const EASE = [0.22, 1, 0.36, 1];
const line = (delay) => ({
  initial: { opacity: 0, y: 30, scale: 0.9, rotateX: -35, z: -120, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, scale: 1, rotateX: 0, z: 0, filter: "blur(0px)", transition: { duration: 1, ease: EASE, delay } },
});

/**
 * Where each icon settles (left/top in %), and where it flies in from (offset in vw/vh,
 * always well outside the viewport). Deterministic on purpose — no Math.random, so SSR and
 * client render identically. The centre band is left free so the text stays clean.
 */
const FLY = [
  { x: 7,  y: 14, from: [-85, -20], size: 60, dur: 1.5, delay: 0.00 }, // from left
  { x: 30, y: 9,  from: [-60, -80], size: 48, dur: 1.3, delay: 0.12 }, // top-left diagonal
  { x: 55, y: 7,  from: [10, -90],  size: 56, dur: 1.2, delay: 0.05 }, // from top
  { x: 80, y: 11, from: [60, -80],  size: 50, dur: 1.4, delay: 0.18 }, // top-right diagonal
  { x: 93, y: 30, from: [85, -10],  size: 64, dur: 1.6, delay: 0.08 }, // from right
  { x: 12, y: 41, from: [-90, 15],  size: 52, dur: 1.2, delay: 0.25 }, // from left
  { x: 88, y: 53, from: [90, 30],   size: 46, dur: 1.5, delay: 0.15 }, // right, low
  { x: 6,  y: 68, from: [-80, 60],  size: 58, dur: 1.4, delay: 0.30 }, // bottom-left diagonal
  { x: 94, y: 77, from: [75, 80],   size: 54, dur: 1.3, delay: 0.10 }, // bottom-right diagonal
  { x: 26, y: 88, from: [-30, 90],  size: 50, dur: 1.2, delay: 0.22 }, // from bottom
  { x: 50, y: 92, from: [5, 95],    size: 62, dur: 1.5, delay: 0.04 }, // from bottom
  { x: 73, y: 86, from: [40, 90],   size: 46, dur: 1.3, delay: 0.28 }, // from bottom
  { x: 19, y: 25, from: [-70, -55], size: 44, dur: 1.6, delay: 0.35 }, // top-left diagonal
  { x: 81, y: 31, from: [70, -45],  size: 44, dur: 1.4, delay: 0.32 }, // top-right diagonal
];

// perceived brightness of a #rrggbb colour (0–255)
const luma = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
};

// small circular path (radius r px) — rounded so SSR and client render identically
const circle = (r, dir) => {
  const N = 8;
  const pts = Array.from({ length: N + 1 }, (_, k) => (dir * 2 * Math.PI * k) / N);
  return {
    x: pts.map((a) => +(Math.sin(a) * r).toFixed(2)),
    y: pts.map((a) => +(-Math.cos(a) * r).toFixed(2)),
  };
};

function FlyingIcon({ item, cfg, i, reduce }) {
  const Icon = item.icon;
  const far = cfg.size < 50; // smaller = "further away" → a bit dimmer + softer
  // dark brand colours (Next.js, Express, GitHub…) would vanish on a dark glass tile,
  // so those get a light glass tile; everything keeps its true brand colour.
  const dark = luma(item.color) < 90;
  const path = circle(8 + (i % 4) * 2.5, i % 2 ? 1 : -1);
  return (
    <motion.div
      className="absolute"
      style={{ left: `${cfg.x}%`, top: `${cfg.y}%`, marginLeft: -cfg.size / 2, marginTop: -cfg.size / 2, width: cfg.size, height: cfg.size }}
      initial={{ x: `${cfg.from[0]}vw`, y: `${cfg.from[1]}vh`, scale: 0.25, rotate: (i % 2 ? 1 : -1) * 120, opacity: 0 }}
      animate={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: far ? 0.75 : 1 }}
      transition={{ duration: cfg.dur, delay: cfg.delay, ease: EASE, opacity: { duration: 0.5, delay: cfg.delay } }}
    >
      {/* quick little circular float around its own spot once it has arrived */}
      <motion.div
        className="grid h-full w-full place-items-center rounded-2xl border backdrop-blur-md"
        style={{
          color: item.color,
          background: dark ? "rgba(255,255,255,.88)" : "rgba(255,255,255,.08)",
          borderColor: dark ? "rgba(255,255,255,.6)" : "rgba(147,197,253,.28)",
          boxShadow: "0 0 28px -6px rgba(96,165,250,.6), inset 0 1px 0 rgba(255,255,255,.25)",
          filter: far ? "blur(.3px)" : undefined,
        }}
        animate={reduce ? undefined : { x: path.x, y: path.y, rotate: [0, i % 2 ? 8 : -8, 0, i % 2 ? -8 : 8, 0] }}
        transition={{ duration: 2.2 + (i % 4) * 0.35, repeat: Infinity, ease: "linear", delay: cfg.delay + cfg.dur * 0.6 }}
      >
        <Icon style={{ width: "54%", height: "54%", filter: "drop-shadow(0 0 6px rgba(255,255,255,.25))" }} aria-hidden="true" />
      </motion.div>
    </motion.div>
  );
}

export default function IntroGate({ children }) {
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);

  // hold ≈4.2s, then exit over ≈0.8s (≈5s total)
  useEffect(() => {
    if (revealed) return;
    const t = setTimeout(() => setRevealed(true), reduce ? 1800 : 4200);
    return () => clearTimeout(t);
  }, [revealed, reduce]);

  // lock scroll while the overlay is up
  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [gone]);

  return (
    <MotionConfig reducedMotion="user">
      <IntroCtx.Provider value={{ revealed }}>
        <AnimatePresence onExitComplete={() => setGone(true)}>
          {!revealed && (
            <motion.div
              key="intro" role="dialog" aria-modal="true" aria-label="Welcome"
              className="intro-bg fixed inset-0 z-[100] grid place-items-center overflow-hidden px-6 font-sans text-white"
              style={{
                background:
                  "radial-gradient(60% 55% at 50% 42%, rgba(59,130,246,.38), transparent 70%), radial-gradient(45% 45% at 88% 88%, rgba(139,92,246,.26), transparent 70%), radial-gradient(40% 40% at 8% 10%, rgba(37,99,235,.24), transparent 70%), #050b1f",
              }}
              initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            >
              {/* depth: faint ring + flying skill icons (behind the text) */}
              <div className="absolute inset-0 z-0 [perspective:900px]" aria-hidden="true">
                <div className="intro-ring" style={{ width: "70vmin", height: "70vmin" }} />
                {SKILL_ORBIT.slice(0, FLY.length).map((item, i) => (
                  <FlyingIcon key={item.label} item={item} cfg={FLY[i]} i={i} reduce={reduce} />
                ))}
              </div>

              <div className="relative z-10 text-center [perspective:1000px] [transform-style:preserve-3d]">
                <motion.p {...line(0.15)} className="text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:text-8xl"
                          style={{ textShadow: "0 0 30px rgba(125,211,252,.55), 0 0 80px rgba(59,130,246,.55), 0 6px 0 rgba(30,64,175,.35)" }}>
                  Welcome
                </motion.p>
                <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1, transition: { duration: 0.8, delay: 0.55, ease: EASE } }}
                            className="mx-auto my-5 h-[2px] w-40 bg-gradient-to-r from-transparent via-sky-300 to-transparent sm:w-56"
                            style={{ boxShadow: "0 0 18px rgba(125,211,252,.7)" }} aria-hidden="true" />
                <motion.h1 {...line(0.6)} className="text-2xl font-medium tracking-tight text-sky-300 sm:text-4xl lg:text-5xl"
                           style={{ textShadow: "0 0 24px rgba(125,211,252,.45), 0 0 60px rgba(59,130,246,.5)" }}>
                  It’s me — Habib Khan
                </motion.h1>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </IntroCtx.Provider>
    </MotionConfig>
  );
}
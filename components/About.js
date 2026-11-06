import Image from "next/image";
import { FiArrowDown, FiAward, FiBookOpen, FiCode, FiCompass } from "react-icons/fi";
import Reveal from "./Reveal";
import { ABOUT_STATS, INFO } from "@/lib/data";

const ICONS = { book: FiBookOpen, code: FiCode, compass: FiCompass, award: FiAward };
// Put the photo at public/images/ with this exact name (or change the path here).
const PHOTO = "/images/WhatsApp Image 2026-09-25 at 6.24.18 PM.jpeg";

export default function About() {
  return (
    <section id="about" className="relative">
      {/* ── Full-bleed photo cover (no side margins) ───────────────────────── */}
      <div className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-black" aria-hidden="true" />
        <Image src={PHOTO} alt="Portrait of Habib Khan" fill priority sizes="100vw" className="object-cover object-[center_25%]" />
        {/* always-dark overlays keep the white text readable in both themes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30" aria-hidden="true" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/70 via-black/20 to-transparent lg:block" aria-hidden="true" />

        <div className="absolute inset-x-0 top-24 flex justify-between px-5 text-[11px] font-semibold uppercase tracking-[.22em] text-white/70 sm:px-8">
          <span>01 / About me</span><span>Web Developer</span>
        </div>

        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-6xl flex-col items-center px-5 pb-24 text-center sm:px-8 lg:items-start lg:text-left">
          <Reveal><p className="eyebrow !text-white">Get to know me</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              I’m a passionate
              <span className="block bg-gradient-to-r from-sky-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">Web Developer.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-6 max-w-xl space-y-3 text-base text-white/80 sm:text-lg">
            <p>I’m Habib Khan, a MERN stack developer who enjoys turning complex problems into simple, well-crafted products.</p>
            <p>I care about clean code, thoughtful design and interfaces that feel effortless to use.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <a href="#experience" className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-md transition hover:border-sky-300 hover:bg-white/15">
              Explore My Journey <FiArrowDown className="nudge transition group-hover:text-sky-300" />
            </a>
          </Reveal>
        </div>
      </div>

      {/* ── Details (darker) ───────────────────────────────────────────────── */}
      <div className="relative bg-deep">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <Reveal><h2 className="h2 !mb-10">More than just writing code.</h2></Reveal>

          <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
            <Reveal className="h-full">
              <article className="card-premium h-full p-7 text-center sm:p-9 lg:text-left">
                <p className="eyebrow mb-4">My story</p>
                <p className="text-muted">
                  I started out curious about how websites work and stayed for the craft. Today I build full-stack MERN applications end to end — from database schema and REST APIs to polished, responsive interfaces.
                </p>
                <p className="mt-4 text-muted">
                  Right now I’m exploring how AI can make those products smarter, while keeping the fundamentals — performance, accessibility and maintainable code — front and centre.
                </p>
              </article>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <article className="card-premium grid h-full grid-cols-3 gap-3 p-5 text-center sm:p-6 lg:grid-cols-1 lg:content-center">
                {ABOUT_STATS.map(([n, l]) => (
                  <div key={l} className="rounded-xl border border-line bg-bg/40 px-2 py-4">
                    <p className="text-xl font-bold text-accent sm:text-2xl">{n}</p>
                    <p className="mt-1 text-xs text-muted">{l}</p>
                  </div>
                ))}
              </article>
            </Reveal>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INFO.map((c, i) => {
              const Icon = ICONS[c.icon];
              return (
                <Reveal key={c.title} delay={i * 0.08} className="h-full">
                  <article className="card-premium h-full p-6 text-center lg:text-left">
                    <span className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent lg:mx-0"><Icon /></span>
                    <h3 className="mb-2 font-semibold">{c.title}</h3>
                    <p className="text-sm text-muted">{c.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

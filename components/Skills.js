import { FiLayout, FiServer, FiTool } from "react-icons/fi";
import Orbit from "./Orbit";
import OrbitCore from "./OrbitCore";
import Reveal from "./Reveal";
import ScrollArrow from "./ScrollArrow";
import { SKILL_GROUPS, SKILL_ORBIT } from "@/lib/data";

const ICONS = { layout: FiLayout, server: FiServer, tool: FiTool };

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-deep">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
           style={{ background: "radial-gradient(60% 42% at 50% 26%, rgb(var(--accent-rgb) / .2), transparent 70%), radial-gradient(40% 35% at 90% 80%, rgb(var(--violet-rgb) / .16), transparent 70%), radial-gradient(40% 35% at 5% 60%, rgb(var(--accent-rgb) / .1), transparent 70%)" }} />
      <div className="section">
        <Reveal className="mb-6 text-center">
          <p className="eyebrow mb-3">Tech universe</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">Skills</h2>
        </Reveal>

        <Reveal y={0}>
          <Orbit items={SKILL_ORBIT} size="min(94vw, 560px)" radii={["30%", "46%"]} badge="clamp(38px, 10vw, 54px)">
            <OrbitCore title="MERN Dev" />
          </Orbit>
        </Reveal>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {SKILL_GROUPS.map((g, i) => {
            const Icon = ICONS[g.icon];
            return (
              <Reveal key={g.title} delay={i * 0.1} className="h-full">
                <article className="card-premium flex h-full flex-col items-center p-7 text-center lg:items-start lg:text-left">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-xl text-accent"><Icon /></span>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[.22em] text-accent">{g.label}</p>
                  <h3 className="mt-1 text-xl font-semibold">{g.title}</h3>
                  <p className="mt-2 text-sm text-muted">{g.desc}</p>
                  <ul className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                    {g.items.map((t) => (
                      <li key={t} className="rounded-full border border-line bg-bg/40 px-3 py-1 text-xs text-muted transition hover:border-accent hover:text-fg">{t}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <ScrollArrow next="projects" />
      </div>
    </section>
  );
}

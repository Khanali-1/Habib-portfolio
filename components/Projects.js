
import { FiExternalLink, FiGithub } from "react-icons/fi";
import Reveal from "./Reveal";
import ScrollArrow from "./ScrollArrow";
import { PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal>
        <h2 className="h2">Projects</h2>
      </Reveal>

      <div className="scene grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className="h-full">

            <article className="card-premium flex h-full flex-col items-center p-6 text-center sm:items-start sm:text-left hover:[transform:rotateX(3deg)_rotateY(-3deg)_translateY(-6px)]">

              {/* Project Screenshot */}
              <div className="mb-5 h-44 w-full overflow-hidden rounded-xl border border-line">
                <img
                  src={p.image}
                  alt={`${p.name} website preview`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Project Name */}
              <h3 className="text-lg font-semibold">
                {p.name}
              </h3>

              {/* Project Description */}
              <p className="mt-2 flex-1 text-sm text-muted">
                {p.desc}
              </p>

              {/* Technologies */}
              <ul className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                {p.tags.map((t) => (
                  <li key={t} className="pill !px-3 !py-1 !text-xs">
                    {t}
                  </li>
                ))}
              </ul>

              {/* Project Links */}
              <div className="mt-5 flex gap-4 text-sm">

                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent"
                >
                  <FiExternalLink />
                  Live Demo
                </a>

                <a
                  href="https://github.com/Khanali-1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-accent"
                >
                  <FiGithub />
                  GitHub
                </a>

              </div>

            </article>

          </Reveal>
        ))}
      </div>

      <ScrollArrow next="experience" />
    </section>
  );
}

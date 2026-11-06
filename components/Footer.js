import { FiArrowUp, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { CONTACT, FOOTER_LINKS } from "@/lib/data";

const socials = [
  { label: "GitHub", href: CONTACT.github, icon: FiGithub },
  { label: "LinkedIn", href: CONTACT.linkedin, icon: FiLinkedin },
  { label: "Email", href: `mailto:${CONTACT.email}`, icon: FiMail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-deep">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 text-center sm:px-8 md:grid-cols-[1.5fr_1fr_1.2fr] md:text-left">
        <div>
          <p className="text-2xl font-bold">Habib Khan<span className="text-accent">.</span></p>
          <p className="mx-auto mt-3 max-w-xs text-sm text-muted md:mx-0">
            MERN stack developer building fast, accessible and polished web apps from database to interface.
          </p>
          <div className="mt-6 flex justify-center gap-3 md:justify-start">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                 className="glass lift grid h-10 w-10 place-items-center rounded-full"><s.icon /></a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 text-sm font-semibold">Explore</h2>
          <ul className="space-y-2.5 text-sm text-muted">
            {FOOTER_LINKS.map((n) => (
              <li key={n}><a href={`#${n.toLowerCase()}`} className="transition hover:text-accent">{n}</a></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold">Let’s Connect</h2>
          <p className="mx-auto max-w-xs text-sm text-muted md:mx-0">Have a role or project in mind? I’d love to hear about it.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a href="#contact" className="btn-primary !py-2.5">Get in touch</a>
            <a href="#home" className="btn-ghost !py-2.5"><FiArrowUp aria-hidden="true" /> Back to top</a>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-6 sm:px-8 md:flex-row">
          <div className="group flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pink-300/10 text-pink-300 transition duration-300 group-hover:scale-110 group-hover:bg-pink-300/25 group-hover:shadow-[0_0_28px_rgba(249,168,212,.55)]">
              <FaHeart aria-hidden="true" />
              <span className="sr-only">Heart</span>
            </span>
            <p className="text-left text-sm leading-snug">
              <span className="block font-medium">
  Your trust means everything to me.
</span>
<span className="block text-muted">
  Quality over quantity — always. Thank you for being here.
</span>
     
            </p>
          </div>
          <p className="text-xs text-muted">© {new Date().getFullYear()} Habib Khan</p>
        </div>
      </div>
    </footer>
  );
}

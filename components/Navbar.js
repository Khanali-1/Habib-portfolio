"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiMoon, FiSun, FiX } from "react-icons/fi";
import { NAV } from "@/lib/data";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.toLowerCase()); el && obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const close = () => setOpen(false);
  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3">
      <nav aria-label="Main" className="glass mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#home" className="text-lg font-bold">Habib Khan<span className="text-accent">.</span></a>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => {
            const id = n.toLowerCase();
            return (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? "page" : undefined}
                   className={`relative pb-1 text-sm transition-colors hover:text-fg ${active === id ? "text-fg" : "text-muted"}`}>
                  {n}
                  <span className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded bg-accent transition-transform duration-300 ${active === id ? "scale-x-100" : "scale-x-0"}`} />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-accent">
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <a href="#contact" className="btn-primary hidden !py-2 sm:inline-flex">Let’s Talk</a>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Toggle menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="glass mx-auto mt-2 max-w-6xl space-y-1 p-3 md:hidden">
          {[...NAV, "Let’s Talk"].map((n, i) => (
            <li key={n}>
              <a onClick={close} href={`#${i === NAV.length ? "contact" : n.toLowerCase()}`}
                 className={`block rounded-xl px-4 py-3 ${active === n.toLowerCase() ? "bg-accent/15 text-accent" : "text-muted"}`}>{n}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

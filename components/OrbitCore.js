import { FiCode } from "react-icons/fi";

/** Shared centre card for both orbits: code icon + title. */
export default function OrbitCore({ title = "MERN Stack Dev" }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-full bg-accent/25 blur-2xl" aria-hidden="true" />
      <div className="card-premium !translate-y-0 flex flex-col items-center px-7 py-6 text-center hover:!translate-y-0">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-violet-500 text-2xl text-white shadow-[0_12px_30px_-10px_rgb(var(--accent-rgb)/.9)]">
          <FiCode aria-hidden="true" />
        </span>
        <p className="mt-4 font-serif text-2xl font-semibold italic leading-none tracking-wide">{title}</p>
        <span className="mt-3 h-px w-12 bg-gradient-to-r from-transparent via-accent to-transparent" aria-hidden="true" />
        <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.28em] text-muted">Habib Khan</p>
      </div>
    </div>
  );
}

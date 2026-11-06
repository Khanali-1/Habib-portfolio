import { FiArrowDown, FiArrowUp } from "react-icons/fi";

/** next = id of the next section; omit on the last section to get "Back to top". */
export default function ScrollArrow({ next }) {
  const last = !next;
  return (
    <a href={last ? "#home" : `#${next}`} aria-label={last ? "Back to top" : "Scroll to next section"}
       className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-xs text-muted hover:text-accent sm:flex">
      {last && <span>Back to top</span>}
      <span className="nudge glass grid h-10 w-10 place-items-center rounded-full">
        {last ? <FiArrowUp /> : <FiArrowDown />}
      </span>
    </a>
  );
}

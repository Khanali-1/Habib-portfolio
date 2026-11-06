
"use client";

import { useState } from "react";
import {
  FiAlertCircle,
  FiArrowUpRight,
  FiBriefcase,
  FiCheckCircle,
  FiGithub,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
  FiUsers,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import Reveal from "./Reveal";
import ScrollArrow from "./ScrollArrow";
import { CONTACT } from "@/lib/data";

// here we have  wrote type  and TYPE{1} MEAN STYPE 1 user sleect for both in lefta nd right will be sleecetd smart waya 

const TYPES = [
  "Job Opportunity",
  "Project Inquiry",
  "Collaboration",
];

const OPPORTUNITIES = [
  {
    title: "Hire Me",
    text: "Full-time or internship roles",
    icon: FiBriefcase,
    type: TYPES[0],
  },
  {
    title: "Build a Project",
    text: "Websites and web apps",
    icon: FiLayers,
    type: TYPES[1],
  },
  {
    title: "Collaboration",
    text: "Open-source and side projects",
    icon: FiUsers,
    type: TYPES[2],
  },
];

// Updated: Hide actual email and WhatsApp number
const DIRECT = [
  {
    label: "Email",
    value: "Send me an email",
    href: `mailto:${CONTACT.email}`,
    icon: FiMail,
  },
  {
    label: "Phone",
    value: "Call me directly",
    href: `tel:${CONTACT.phone}`,
    icon: FiPhone,
  },
  {
    label: "WhatsApp",
    value: "Chat with me on WhatsApp",
    href: `https://wa.me/${CONTACT.whatsapp}`,
    icon: FaWhatsapp,
    external: true,
  },
];

const label = "mb-1.5 block text-sm font-medium";

export default function Contact() {
  const [type, setType] = useState(TYPES[0]);
  const [status, setStatus] = useState("idle");// still not anything confirmed to send
  const [error, setError] = useState("");

  
async function onSubmit(e) {
  e.preventDefault();

  if (status === "loading") return;

  const form = e.currentTarget;

  const data = {
    ...Object.fromEntries(new FormData(form)),
    type,
  };

  setStatus("loading");
  setError("");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.error || "Unable to send message."
      );
    }

    setStatus("success");
    form.reset();
    setType(TYPES[0]);

  } catch (err) {
    setError(
      err.message === "Failed to fetch"
        ? "Network error. Please try again."
        : err.message
    );

    setStatus("error");
  }
}



  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-deep"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(50% 40% at 85% 10%, rgb(var(--accent-rgb) / .13), transparent 70%), radial-gradient(40% 35% at 5% 95%, rgb(var(--violet-rgb) / .12), transparent 70%)",
        }}
      />

      <div className="section">
        <Reveal className="mb-14 text-center lg:text-left">
          <p className="eyebrow mb-3">Let’s connect</p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Have an idea? Let’s make it happen.
          </h2>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">

          {/* LEFT SIDE */}

          <Reveal className="space-y-8 text-center lg:text-left">
            <div>
              <h3 className="text-2xl font-semibold">
                Start a conversation.
              </h3>

              <p className="mx-auto mt-3 max-w-md text-muted lg:mx-0">
                Whether it’s a role, a project or an idea you want to bounce around, send a message and I’ll reply as soon as I can.
              </p>
            </div>

            {/* Opportunities  here in map o represent the current object*/}

            <div className="grid gap-3 sm:grid-cols-3">
              
              {OPPORTUNITIES.map((o) => {
                const on = type === o.type;

                return (
                  <button
                    key={o.title}
                    type="button"
                    onClick={() => setType(o.type)}
                    aria-pressed={on}
                    className={`card-premium flex flex-col items-center p-4 text-center lg:items-start lg:text-left ${
                      on ? "!border-accent" : ""
                    }`}
                  >
                    <o.icon
                      className="text-xl text-accent"
                      aria-hidden="true"
                    />

                    <span className="mt-3 text-sm font-semibold">
                      {o.title}
                    </span>

                    <span className="mt-1 text-xs text-muted">
                      {o.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Direct Contact */}

            <ul className="space-y-3">
              {DIRECT.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    {...(
                      d.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {}
                    )}
                    className="card-premium group flex items-center gap-4 !rounded-xl px-4 py-3.5 text-left hover:!translate-y-0 hover:!translate-x-1"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                      <d.icon aria-hidden="true" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted">
                        {d.label}
                      </span>

                      <span className="block truncate text-sm font-medium">
                        {d.value}
                      </span>
                    </span>

                    <FiArrowUpRight className="shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Links */}

            <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between lg:justify-start lg:gap-8">
              <div className="flex gap-3">
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="glass lift grid h-11 w-11 place-items-center rounded-full"
                >
                  <FiGithub />
                </a>

                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="glass lift grid h-11 w-11 place-items-center rounded-full"
                >
                  <FiLinkedin />
                </a>
              </div>

              <p className="inline-flex items-center gap-2 text-sm text-muted">
                <FiMapPin className="text-accent" aria-hidden="true" />
                {CONTACT.location}
              </p>
            </div>

            {/* Availability */}

            <p className="inline-flex items-center gap-2.5 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm">
              <span
                className="dot-live h-2.5 w-2.5 rounded-full bg-green-500"
                aria-hidden="true"
              />
              Available for new opportunities
            </p>
          </Reveal>

          {/* RIGHT SIDE - CONTACT FORM */}

          <Reveal delay={0.12}>
            <form
              onSubmit={onSubmit}
              className="card-premium !translate-y-0 space-y-5 p-6 hover:!translate-y-0 sm:p-8"
              noValidate={false}
            >
              {/* Honeypot */}

              <input
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {/* Name and Email */}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className={label}>
                    Name
                  </label>

                  <input
                    id="c-name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="c-email" className={label}>
                    Email
                  </label>

                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="field"
                  />
                </div>
              </div>

              {/* Inquiry Type */}

              <fieldset>
                <legend className={label}>
                  Inquiry type
                </legend>

                <div
                  role="radiogroup"
                  aria-label="Inquiry type"
                  className="flex flex-wrap gap-2"
                >
                  {TYPES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={type === t}
                      onClick={() => setType(t)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        type === t
                          ? "border-accent bg-accent/15 text-fg"
                          : "border-line text-muted hover:border-accent/60 hover:text-fg"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Subject */}

              <div>
                <label htmlFor="c-subject" className={label}>
                  Subject
                </label>

                <input
                  id="c-subject"
                  name="subject"
                  placeholder="What’s this about?"
                  className="field"
                />
              </div>

              {/* Message */}

              <div>
                <label htmlFor="c-message" className={label}>
                  Message
                </label>

                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  placeholder="Tell me a little about your idea…"
                  className="field resize-y"
                />
              </div>

              {/* Submit Button */}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Sending…
                  </>
                ) : (
                  <>
                    <FiSend aria-hidden="true" />
                    Send message
                  </>
                )}
              </button>

              {/* Form Status */}

              <div aria-live="polite" className="min-h-[1.5rem]">
                {status === "success" && (
                  <p
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm"
                  >
                    <FiCheckCircle className="mt-0.5 shrink-0 text-green-500" />
                    Message sent. Thanks for reaching out — I’ll get back to you soon.
                  </p>
                )}

                {status === "fallback" && (
                  <p
                    role="status"
                    className="flex items-start gap-2 rounded-xl border border-accent/30 bg-accent/10 p-3 text-sm"
                  >
                    <FiMail className="mt-0.5 shrink-0 text-accent" />
                    Opening your mail app so you can send this.
                    Nothing opened? Email me directly.
                  </p>
                )}

                {status === "error" && (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm"
                  >
                    <FiAlertCircle className="mt-0.5 shrink-0 text-red-500" />
                    {error} You can also contact me through the email link.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>

        <ScrollArrow />
      </div>
    </section>
  );
}

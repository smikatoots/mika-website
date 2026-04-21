"use client";

import posthog from "posthog-js";

const cardClass =
  "group flex h-full min-h-[3.25rem] items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 py-3.5 shadow-sm transition-colors hover:border-zinc-300 hover:bg-zinc-50/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400";

const labelClass =
  "text-[0.95rem] font-medium text-zinc-600 underline decoration-zinc-400 underline-offset-[3px] transition-colors group-hover:text-zinc-900 group-hover:decoration-zinc-600";

function IconAt() {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center text-xl font-semibold leading-none text-accent"
      aria-hidden
    >
      @
    </span>
  );
}

function IconLinkedIn() {
  return (
    <svg
      className="h-8 w-8 shrink-0"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill="#0A66C2"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg className="h-8 w-8 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient
          id="homeCtaInstagram"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        fill="url(#homeCtaInstagram)"
      />
      <circle
        cx="12"
        cy="12"
        r="4.25"
        fill="none"
        stroke="#fff"
        strokeWidth="1.75"
      />
      <circle cx="17.25" cy="6.75" r="1.25" fill="#fff" />
    </svg>
  );
}

function IconTwitter() {
  return (
    <svg className="h-8 w-8 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#1D9BF0"
        d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
      />
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg className="h-8 w-8 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#000"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
      />
    </svg>
  );
}

function IconCoach() {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center text-2xl leading-none"
      aria-hidden
    >
      🧑‍🏫
    </span>
  );
}

const ctas = [
  {
    label: "Contact",
    href: "https://letterbird.co/mikareyes",
    icon: IconAt,
  },
  {
    label: "Connect",
    href: "https://www.linkedin.com/in/itsmikareyes",
    icon: IconLinkedIn,
  },
  {
    label: "Follow",
    href: "https://www.instagram.com/its.mikareyes/",
    icon: IconInstagram,
  },
  {
    label: "Tweet",
    href: "https://twitter.com/__mikareyes",
    icon: IconTwitter,
  },
  {
    label: "Watch",
    href: "https://www.tiktok.com/@its.mikareyes",
    icon: IconTikTok,
  },
  {
    label: "Get coached",
    href: "https://www.joinleland.com/coach/mikaela-r",
    icon: IconCoach,
  },
] as const;

export function HomeCtaGrid() {
  return (
    <nav
      className="mt-12 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
      aria-label="Social and contact"
    >
      {ctas.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          className={cardClass}
          rel="noopener noreferrer"
          target="_blank"
          onClick={() => posthog.capture("social_link_clicked", { label, href })}
        >
          <Icon />
          <span className={labelClass}>{label}</span>
        </a>
      ))}
    </nav>
  );
}

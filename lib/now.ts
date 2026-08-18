// What I'm up to. Edit this file — there's no API behind it.
// Bump `nowUpdated` when you change something, it's shown next to the heading.

export type NowEntry = {
  label: string;
  // omit when `latestPost` is set — the post supplies it
  value?: string;
  href?: string;
  // an aside, in your voice — set under the value in small type
  note?: string;
  // fills value + href from the newest published post, so this never goes stale
  latestPost?: boolean;
  // fills value + href + note from the most recent Letterboxd diary entry
  latestFilm?: boolean;
};

// whose Letterboxd diary `latestFilm` reads
export const letterboxdUser = "itsdevesh";

export const nowUpdated = "2026-08";

export const now: NowEntry[] = [
  {
    label: "building",
    value: "agentic CRM — AI agents, tool calling & intelligent workflows",
    note: "combining modern CRM architecture with LLMs, RAG, and scalable backend systems. very much a work in progress.",
  },
  {
    label: "exploring",
    value: "AI agents, LLM workflows & RAG",
    note: "figuring out how to use agents and LLMs to build genuinely useful software — not just chat interfaces.",
  },
  {
    label: "engineering",
    value: "distributed & real-time systems",
    note: "scalable backend architecture, real-time communication, WebRTC, background job processing, and multi-tenant systems.",
  },
  {
    label: "writing",
    latestPost: true,
  },
  {
    label: "last watched",
    latestFilm: true,
  },
];

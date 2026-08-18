// Work history. Photos are optional — a card renders fine without any, so you
// can fill these in as you get them.
//
// One folder per company under /public/images/experience/<company>/, listed
// oldest-to-newest or best-first: the first image is the one the card shows.
export type Experience = {
  company: string;
  role: string;
  // free text: "winter 2026", "2026 — present". Omit if you'd rather not date it.
  period?: string;
  description: string;
  href?: string;
  // paths under /public, e.g. ["/images/experience/leadchain/office.jpg"].
  // The first is the card's photo; the rest are there for later.
  images?: string[];
};

export const experience: Experience[] = [
  {
    company: "Leadchain Systems",
    role: "Full Stack Software Engineer",
    period: "Dec 2024 — present",
    description:
      "Building scalable real-time, distributed, and AI-powered systems across the company's SaaS and CRM products — WebRTC/Mediasoup infrastructure, WhatsApp messaging, BullMQ/Redis background processing, AWS S3 media pipelines, multi-tenant architecture, and RAG/conversational AI systems.",
    href: "https://leadchain.com",
    // images: ["/images/experience/leadchain/1.jpg"],
  },
];

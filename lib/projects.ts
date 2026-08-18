// Single source of truth for projects — consumed by the homepage and /api/projects.
export type Project = {
  name: string;
  description: string;
  stack: string[];
  // outbound link, when the project lives somewhere public
  link?: string;
  // slug of a writeup in content/projects/ — takes precedence over `link`
  slug?: string;
};

export const projects: Project[] = [
  {
    name: "nerdShare",
    description:
      "A privacy-first peer-to-peer file-sharing platform that enables direct browser-to-browser transfers without relying on a centralised file-storage server. Built around real-time signaling and WebRTC.",
    stack: ["TypeScript", "React", "WebRTC", "WebSockets", "Bun", "Node.js"],
    link: "https://github.com/nerdlydev/nerdShare",
    slug: "nerdshare",
  },
  {
    name: "Kebo",
    description:
      "A keyboard-first command interface for Chromium browsers that makes browser actions faster and more accessible through a command-driven workflow.",
    stack: ["TypeScript", "JavaScript", "Chromium Extensions API"],
    link: "https://github.com/nerdlydev/kebo",
    slug: "kebo",
  },
  {
    name: "Real-Time Screen Streaming Platform",
    description:
      "A real-time screen-streaming system built around WebRTC and a mediasoup SFU, supporting authenticated signaling, room-based streaming, producer/consumer lifecycle management, and recovery from network interruptions.",
    stack: ["TypeScript", "Electron", "Node.js", "WebRTC", "mediasoup", "Socket.IO", "JWT"],
  },
  {
    name: "RAG / Conversational AI Systems",
    description:
      "Production-oriented AI systems involving retrieval-augmented generation, vector search, LLM inference, and conversational workflows — including integration with Milvus and NVIDIA NIM.",
    stack: ["TypeScript", "Node.js", "RAG", "LLMs", "Milvus", "NVIDIA NIM", "PostgreSQL", "Redis"],
  },
];

// Skills grouped by category — rendered on the homepage Skills section.
export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "C++", "Rust", "Bash"],
  },
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TanStack Query",
      "TanStack Router",
      "Zustand",
      "Redux Toolkit",
      "Tailwind CSS",
      "Electron.js",
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      "Node.js",
      "NestJS",
      "Express.js",
      "Fastify",
      "REST APIs",
      "OpenAPI",
      "Orval",
      "Zod",
      "JWT",
      "WebSockets",
      "Socket.IO",
    ],
  },
  {
    label: "Databases & Storage",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Milvus",
      "AWS S3",
      "Firebase",
      "PgBouncer",
    ],
  },
  {
    label: "Real-Time & Distributed",
    items: [
      "WebRTC",
      "Mediasoup SFU",
      "BullMQ",
      "RabbitMQ",
      "WhatsApp Business API",
    ],
  },
  {
    label: "Architecture",
    items: [
      "Microservices",
      "Multi-Tenant Architecture",
      "RBAC",
    ],
  },
  {
    label: "AI & LLM",
    items: [
      "RAG",
      "NVIDIA NIM",
      "Vector Databases",
      "Semantic Search",
      "Retrieval Reranking",
      "Conversational AI",
    ],
  },
  {
    label: "Testing",
    items: ["Unit Testing", "Jest"],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS",
      "Docker",
      "Linux",
      "Ubuntu",
      "Git",
      "GitHub",
      "Azure DevOps",
      "CI/CD",
    ],
  },
];

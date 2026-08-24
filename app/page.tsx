import { Contributions } from "./components/contributions";
import { Skills } from "./components/skills";
import { Now } from "./components/now";
import { PreviewLink } from "./components/preview-link";
import * as s from "./components/styles";
import { socials } from "../lib/socials";

// The contribution fetch revalidates hourly, which makes this page ISR too.
const socialLink =
  "group inline-flex items-center gap-[0.35rem] font-mono text-[0.78rem] lowercase text-muted transition-colors hover:text-foreground";

const arrow =
  "text-faint transition-transform group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:text-accent";

// Intro only — writing, mentions, and projects live behind the nav.
// Stats (GitHub activity, now playing) will land below the links.
export default function Home() {
  return (
    <main className="page">
      <h1 className={s.pageTitle}>Devesh Sharma</h1>
      <p className={s.tagline}>Building real-time, distributed &amp; AI-powered systems.</p>

      <p className="mt-8 text-[0.95rem] leading-[1.8] text-pretty text-muted">
        I&apos;m a Full Stack Software Engineer at{" "}
        <PreviewLink href="https://leadchainsystems.com">
          Leadchain Systems
        </PreviewLink>
        , where I build scalable real-time, distributed, and AI-powered
        systems — spanning{" "}
        <PreviewLink href="https://webrtc.org">WebRTC</PreviewLink>
        /Mediasoup infrastructure, WhatsApp messaging, BullMQ/Redis background
        processing, AWS S3 media pipelines, multi-tenant SaaS architecture, and
        RAG/conversational AI systems. Outside of work, I&apos;m building{" "}
        <PreviewLink href="https://github.com/nerdlydev/nerdShare">
          nerdShare
        </PreviewLink>{" "}
        — a privacy-first P2P file-sharing platform — and{" "}
        <PreviewLink href="https://github.com/nerdlydev/kebo">
          Kebo
        </PreviewLink>
        , a keyboard-first command interface for Chromium browsers.
      </p>

      <div
        className="mt-7 flex flex-wrap gap-x-[1.1rem] gap-y-[0.4rem]"
        data-reveal
        data-stagger
      >
        {socials.map((social) => (
          <a
            key={social.medium}
            className={socialLink}
            href={social.link}
            target="_blank"
            rel="noreferrer"
          >
            {social.medium}
            <span className={arrow}>↗</span>
          </a>
        ))}
        <a
          className={socialLink}
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Résumé
          <span className={arrow}>↗</span>
        </a>
      </div>

      <Contributions login="nerdlydev" />
      <Now />

      <Skills />

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Devesh Sharma</span>
      </footer>
    </main>
  );
}

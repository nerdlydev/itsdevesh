import type { Metadata } from "next";
import Link from "next/link";
import { Experience } from "../components/experience";
import * as s from "../components/styles";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Where Devesh Sharma has worked — Leadchain Systems.",
};

export default function WorkIndex() {
  return (
    <main className="page">
      <h1 className={s.pageTitle}>Work</h1>
      <p className={s.tagline}>Places I&apos;ve worked, and what I shipped.</p>

      <Experience />

      <footer className={s.footer}>
        <span>© {new Date().getFullYear()} Devesh Sharma</span>
        <Link href="/">itsdevesh.me</Link>
      </footer>
    </main>
  );
}

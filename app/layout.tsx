import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { CursorGlow } from "./components/cursor-glow";
import { MusicPlayer } from "./components/spotify-tracks";
import { Nav } from "./components/nav";
import { Reveal } from "./components/reveal";
import "./globals.css";

// Runs before the body paints, so scroll-reveal targets start hidden without a
// flash of the final layout first. Gated on the motion preference here — the
// CSS never hides anything unless this attribute lands, which also means a
// visitor with JS off sees the whole page rather than a blank column.
const armMotion = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-motion","")}catch(e){}`;

// Display face for headings — mono stays for metadata, sans for body copy.
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://itsdevesh.me"),
  title: {
    default: "Devesh Sharma",
    template: "%s — Devesh Sharma",
  },
  description:
    "Devesh Sharma — Full Stack Software Engineer building real-time, distributed & AI-powered systems. Currently at Leadchain Systems.",
  openGraph: {
    title: "Devesh Sharma",
    description:
      "Full Stack Software Engineer building real-time, distributed & AI-powered systems.",
    url: "https://itsdevesh.me",
    siteName: "Devesh Sharma",
    type: "website",
  },
  // lets a reader find the feed from any page on the site. No `canonical` here
  // on purpose — root metadata is inherited, so it would claim every page is
  // the homepage.
  alternates: {
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "Devesh Sharma" }] },
  },
  twitter: {
    card: "summary_large_image",
    title: "Devesh Sharma",
    description:
      "Full Stack Software Engineer building real-time, distributed & AI-powered systems.",
  },
};

export const viewport: Viewport = {
  themeColor: "#191921",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds data-motion to
    // <html> before React hydrates, which is the whole point — the attribute
    // has to be in place for the first paint, so it can't match the server HTML
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: armMotion }} />
        <CursorGlow />
        <Nav />
        {children}
        <MusicPlayer />
        <Reveal />
      </body>
    </html>
  );
}

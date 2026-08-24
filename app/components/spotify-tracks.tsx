"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Track = {
  id: string;
  title: string;
  artist: string;
  thumb: string;
};

const TRACKS: Track[] = [
  {
    id: "e7wnBiqruXI",
    title: "Stardust",
    artist: "Kabir",
    thumb: "https://i.ytimg.com/vi/e7wnBiqruXI/mqdefault.jpg",
  },
  {
    id: "jp2NfmVhLGs",
    title: "Hood Harvest",
    artist: "Raf Saperra",
    thumb: "https://i.ytimg.com/vi/jp2NfmVhLGs/mqdefault.jpg",
  },
  {
    id: "-_OPJ2d86kE",
    title: "They Don't Care About Us",
    artist: "Michael Jackson",
    thumb: "https://i.ytimg.com/vi/-_OPJ2d86kE/mqdefault.jpg",
  },
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const YT_PLAYING = 1;

export function MusicPlayer() {
  const playerRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const mountRef = useRef<HTMLDivElement>(null);
  const [apiReady, setApiReady] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [started, setStarted] = useState(false); // true after first play

  const track = TRACKS[trackIndex];

  // Load YouTube IFrame API once
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.YT?.Player) { setApiReady(true); return; }
    window.onYouTubeIframeAPIReady = () => setApiReady(true);
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  }, []);

  // Create hidden player
  useEffect(() => {
    if (!apiReady || !mountRef.current || playerRef.current) return;
    playerRef.current = new window.YT.Player(mountRef.current, {
      height: "1",
      width: "1",
      videoId: "",
      playerVars: { autoplay: 0, rel: 0, modestbranding: 1, playsinline: 1 },
      events: {
        onStateChange: (e: { data: number }) => {
          setPlaying(e.data === YT_PLAYING);
        },
      },
    });
  }, [apiReady]);

  const loadAndPlay = useCallback((index: number) => {
    if (!playerRef.current) return;
    setTrackIndex(index);
    setStarted(true);
    playerRef.current.loadVideoById({ videoId: TRACKS[index].id });
  }, []);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (!started) { loadAndPlay(trackIndex); return; }
    const state = playerRef.current.getPlayerState?.() ?? -1;
    if (state === YT_PLAYING) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [started, trackIndex, loadAndPlay]);

  const prev = useCallback(() => {
    const i = (trackIndex - 1 + TRACKS.length) % TRACKS.length;
    loadAndPlay(i);
  }, [trackIndex, loadAndPlay]);

  const next = useCallback(() => {
    const i = (trackIndex + 1) % TRACKS.length;
    loadAndPlay(i);
  }, [trackIndex, loadAndPlay]);

  return (
    <>
      {/* Hidden YT mount */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
        <div ref={mountRef} />
      </div>

      {/* Fixed corner player */}
      <div
        className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2"
        style={{ fontFamily: "var(--font-geist-mono, monospace)" }}
      >
        {/* Expanded panel */}
        {expanded && (
          <div
            className="flex items-center gap-3 border border-line bg-card/95 px-3 py-2.5 shadow-lg backdrop-blur-sm"
            style={{ minWidth: 220 }}
          >
            {/* album art */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={track.thumb}
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 object-cover"
            />

            {/* track info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.78rem] text-foreground leading-tight">
                {track.title}
              </p>
              <p className="truncate text-[0.6rem] lowercase text-faint leading-tight mt-0.5">
                {track.artist}
              </p>
            </div>

            {/* controls */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous"
                className="text-faint text-[0.7rem] transition-colors hover:text-foreground"
              >
                ⏮
              </button>
              <button
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="text-accent text-[0.85rem] transition-colors hover:text-accent-hover"
              >
                {playing ? "⏸" : "▶"}
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="text-faint text-[0.7rem] transition-colors hover:text-foreground"
              >
                ⏭
              </button>
            </div>
          </div>
        )}

        {/* Collapsed pill — always visible */}
        <button
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Close player" : "Open music player"}
          className="relative flex size-11 items-center justify-center border border-line bg-card/95 shadow-lg backdrop-blur-sm transition-colors hover:border-line-strong overflow-hidden"
        >
          {/* album art as background */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={track.thumb}
            alt=""
            width={44}
            height={44}
            className="absolute inset-0 size-full object-cover opacity-40"
          />

          {/* overlay icon */}
          <span className="relative z-10 text-[0.7rem] text-foreground">
            {playing ? (
              /* animated equaliser bars */
              <span className="flex items-end gap-[2px] h-3.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-accent"
                    style={{
                      height: "100%",
                      animation: `music-bar 0.7s ease-in-out ${i * 0.15}s infinite alternate`,
                    }}
                  />
                ))}
              </span>
            ) : (
              <span className="text-accent">♪</span>
            )}
          </span>
        </button>
      </div>
    </>
  );
}

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FILM_SRC =
  "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";

export default function WatchFilmDialog({ open, onOpenChange }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const video = videoRef.current;
    if (!video) return;
    let hls;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = FILM_SRC;
    } else if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(FILM_SRC);
      hls.attachMedia(video);
    } else {
      video.src = FILM_SRC;
    }
    video.muted = false;
    const t = setTimeout(() => {
      video.play().catch(() => {});
    }, 200);
    return () => {
      clearTimeout(t);
      if (hls) hls.destroy();
      try {
        video.pause();
      } catch (_) {}
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="watch-film-dialog"
        className="bg-black border border-white/10 text-white max-w-4xl w-[90vw] p-0 overflow-hidden rounded-3xl"
      >
        <DialogTitle className="sr-only">Watch the Film</DialogTitle>
        <DialogDescription className="sr-only">
          A short cinematic showing how MM Innovation Consulting works.
        </DialogDescription>
        <div className="aspect-video w-full bg-black">
          <video
            ref={videoRef}
            controls
            playsInline
            className="w-full h-full object-cover"
            data-testid="watch-film-video"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

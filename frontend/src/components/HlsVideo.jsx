import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

/**
 * HlsVideo: plays an HLS (.m3u8) stream with hls.js fallback
 * for browsers without native support.
 */
export default function HlsVideo({
  src,
  className = "",
  style = {},
  poster,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true, lowLatencyMode: false });
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      video.src = src;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
    />
  );
}

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

/**
 * BlurText
 * Splits text by words or letters and animates each piece in
 * with a gaussian blur dissolve, staggered. Triggers when
 * the element enters the viewport (IntersectionObserver via useInView).
 */
export default function BlurText({
  text = "",
  delay = 200,
  animateBy = "words", // "words" | "letters"
  direction = "bottom", // "bottom" | "top"
  className = "",
  as: Tag = "h1",
  threshold = 0.2,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (inView) setHasTriggered(true);
  }, [inView]);

  const pieces =
    animateBy === "letters" ? Array.from(text) : text.split(" ");

  const yFrom = direction === "bottom" ? 50 : -50;

  return (
    <Tag ref={ref} className={className} data-testid="blur-text">
      {pieces.map((piece, i) => {
        const isSpace = piece === " ";
        return (
          <motion.span
            key={i}
            style={{ display: "inline-block", whiteSpace: "pre" }}
            initial={{ filter: "blur(10px)", opacity: 0, y: yFrom }}
            animate={
              hasTriggered
                ? {
                    filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
                    opacity: [0, 0.5, 1],
                    y: [yFrom, -5, 0],
                  }
                : { filter: "blur(10px)", opacity: 0, y: yFrom }
            }
            transition={{
              duration: 0.7,
              delay: (i * delay) / 1000,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.5, 1],
            }}
          >
            {animateBy === "letters" ? (isSpace ? "\u00A0" : piece) : piece + (i < pieces.length - 1 ? " " : "")}
          </motion.span>
        );
      })}
    </Tag>
  );
}

import { useRef, useState, useEffect } from "react";

import raysVideo from "../assets/4s.mp4";
import reverseVideo from "../assets/rev1.mp4";

function Hero() {
  const forwardRef = useRef(null);
  const reverseRef = useRef(null);

  const lastPointerX = useRef(null);

  const [direction, setDirection] = useState("forward");

  const PLAYBACK_RATE = 4;

  // ===== PLAY REGION =====
  const LEFT_WIDTH = 300;
  const LEFT_OFFSET = 1150;

  // Preload both videos
  useEffect(() => {
    const forward = forwardRef.current;
    const reverse = reverseRef.current;

    if (!forward || !reverse) return;

    forward.load();
    reverse.load();

    // Make sure both are paused initially
    forward.pause();
    reverse.pause();
  }, []);

  // ==============================
  // FORWARD
  // ==============================
  const playForward = () => {
    const forward = forwardRef.current;
    const reverse = reverseRef.current;

    if (!forward || !reverse) return;

    reverse.pause();

    // Prepare first frame BEFORE showing
    forward.currentTime = 0;
    forward.playbackRate = PLAYBACK_RATE;

    const start = () => {
      setDirection("forward");

      forward.play().catch(() => {});
    };

    // Wait until browser has the first frame
    if (forward.readyState >= 3) {
      start();
    } else {
      forward.addEventListener("canplay", start, {
        once: true,
      });
    }
  };

  // ==============================
  // REVERSE
  // ==============================
  const playReverse = () => {
    const forward = forwardRef.current;
    const reverse = reverseRef.current;

    if (!forward || !reverse) return;

    forward.pause();

    // Prepare first frame BEFORE showing
    reverse.currentTime = 0;
    reverse.playbackRate = PLAYBACK_RATE;

    const start = () => {
      setDirection("reverse");

      reverse.play().catch(() => {});
    };

    // Wait until browser has the first frame
    if (reverse.readyState >= 3) {
      start();
    } else {
      reverse.addEventListener("canplay", start, {
        once: true,
      });
    }
  };

  // ==============================
  // CURSOR MOVEMENT
  // ==============================
  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const regionStart = LEFT_OFFSET;
    const regionEnd = LEFT_OFFSET + LEFT_WIDTH;

    const previousX = lastPointerX.current;

    // RIGHT → LEFT
    if (
      previousX !== null &&
      previousX > regionEnd &&
      x >= regionStart &&
      x <= regionEnd
    ) {
      playReverse();
    }

    // LEFT → RIGHT
    if (
      previousX !== null &&
      previousX < regionStart &&
      x >= regionStart &&
      x <= regionEnd
    ) {
      playForward();
    }

    lastPointerX.current = x;
  };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* ================= FORWARD ================= */}
      <video
        ref={forwardRef}
        src={raysVideo}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover ${
          direction === "forward"
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      {/* ================= REVERSE ================= */}
      <video
        ref={reverseRef}
        src={reverseVideo}
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 h-full w-full object-cover ${
          direction === "reverse"
            ? "opacity-100"
            : "opacity-0"
        }`}
      />

      {/* ================= RED REGION ================= */}
      <div
        className="absolute top-0 bottom-0 z-20 "
        style={{
          width: `${LEFT_WIDTH}px`,
          left: `${LEFT_OFFSET}px`,
        }}
      />

      {/* CONTENT */}
      <div className="relative z-30">
        {/* Navbar / text / buttons */}
      </div>
    </section>
  );
}

export default Hero;
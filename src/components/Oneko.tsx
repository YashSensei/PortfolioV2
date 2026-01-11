"use client";

import { useEffect, useRef } from "react";

/**
 * Oneko - A cute cat that follows your cursor around the page
 * Based on the oneko.js library (https://github.com/adryd325/oneko.js)
 */
export default function Oneko() {
  const nekoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const nekoEl = nekoRef.current;
    if (!nekoEl) return;

    // Cat sprite positions (32x32 sprites)
    const spriteSets: Record<string, [number, number][]> = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [
        [-5, 0],
        [-6, 0],
        [-7, 0],
      ],
      scratchWallN: [
        [0, 0],
        [0, -1],
      ],
      scratchWallS: [
        [-7, -1],
        [-6, -2],
      ],
      scratchWallE: [
        [-2, -2],
        [-2, -3],
      ],
      scratchWallW: [
        [-4, 0],
        [-4, -1],
      ],
      tired: [[-3, -2]],
      sleeping: [
        [-2, 0],
        [-2, -1],
      ],
      N: [
        [-1, -2],
        [-1, -3],
      ],
      NE: [
        [0, -2],
        [0, -3],
      ],
      E: [
        [-3, 0],
        [-3, -1],
      ],
      SE: [
        [-5, -1],
        [-5, -2],
      ],
      S: [
        [-6, -3],
        [-7, -2],
      ],
      SW: [
        [-5, -3],
        [-6, -1],
      ],
      W: [
        [-4, -2],
        [-4, -3],
      ],
      NW: [
        [-1, 0],
        [-1, -1],
      ],
    };

    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    const nekoSpeed = 10;

    const setSprite = (name: string, frame: number) => {
      const sprite = spriteSets[name]?.[frame % spriteSets[name].length];
      if (!sprite || !nekoEl) return;
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    };

    const idle = () => {
      idleTime += 1;

      // Start idle animation after being still for a while
      if (idleTime > 10 && Math.random() < 0.01 && !idleAnimation) {
        const availableIdleAnimations = ["sleeping", "scratchSelf"];

        // Add wall scratching if near edges
        if (nekoPosX < 32) availableIdleAnimations.push("scratchWallW");
        if (nekoPosY < 32) availableIdleAnimations.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) availableIdleAnimations.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) availableIdleAnimations.push("scratchWallS");

        idleAnimation =
          availableIdleAnimations[Math.floor(Math.random() * availableIdleAnimations.length)];
      }

      if (idleAnimation) {
        // Show tired before sleeping
        if (idleAnimation === "sleeping") {
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            idleAnimationFrame += 1;
            return;
          }
        }
        setSprite(idleAnimation, idleAnimationFrame);
        idleAnimationFrame += 1;
      } else {
        setSprite("idle", 0);
      }
    };

    const frame = () => {
      frameCount += 1;

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // Cat reached the cursor, go idle
      if (distance < nekoSpeed || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;
      idleTime = 0;

      // Determine direction
      let direction = "";
      if (diffY / distance > 0.5) direction += "N";
      else if (diffY / distance < -0.5) direction += "S";
      if (diffX / distance > 0.5) direction += "W";
      else if (diffX / distance < -0.5) direction += "E";

      if (direction) {
        setSprite(direction, frameCount);
      }

      // Move cat towards cursor
      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;

      // Keep within bounds
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosX = e.clientX;
      mousePosY = e.clientY;
    };

    // Initialize position
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;

    document.addEventListener("mousemove", handleMouseMove);

    // Animation loop (~10fps for retro feel)
    const intervalId = setInterval(frame, 100);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      ref={nekoRef}
      aria-hidden="true"
      className="fixed pointer-events-none z-[9999]"
      style={{
        width: "32px",
        height: "32px",
        backgroundImage: "url(/oneko.gif)",
        imageRendering: "pixelated",
        left: "16px",
        top: "16px",
      }}
    />
  );
}

"use client";
import useMouseMove from "@/hooks/useMouseMove";
import styles from "./startrail.module.css";
import { useEffect, useRef, useState } from "react";
import getRandomArrayElement from "@/utils/getRandomArrayElement";
import getDistance from "@/utils/getDistance";
import Snowflake from "@/assets/svg/Snowflake";

interface IRemanant {
  id: string;
  x: number;
  y: number;
  ttl: NodeJS.Timeout;
  backgroundColor: string;
  animationClass: string;
}

interface IGlow {
  id: string;
  x: number;
  y: number;
  ttl: NodeJS.Timeout;
}

const randomColors = ["gold", "greenyellow", "crimson", "hotpink", "aqua"];
const randomAnimation = ["fallingDown1", "fallingDown2", "fallingDown3"];

export default function StarTrail() {
  // mouse coordinates
  const { mouseX, mouseY } = useMouseMove();
  // remnants array
  const [remnants, setRemnants] = useState<IRemanant[]>([]);
  // glow array
  const [glow, setGlow] = useState<IGlow[]>([]);

  // cleanup function. removes remnant with id from the array
  const removeRemnant = (id: string) => {
    setRemnants((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  // cleanup function. removes remnant with id from the array
  const removeGlow = (id: string) => {
    setGlow((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  // filling glow blanks
  const lastGlowPosition = useRef<{ x: number; y: number } | null>(null);

  // debouncing
  // debouncing is done based on time passed tracked by deBouncer and
  // distance travelled calculated from lastRemnantPosition and current mouse position
  const deBouncer = useRef(false);
  const lastRemnantPosition = useRef<{ x: number; y: number }>({
    x: -200,
    y: 800,
  });

  useEffect(() => {
    // initial state breaker
    if (mouseX === -200) return;
    // filling possible gaps between glow elements with distributed glow elements
    if (lastGlowPosition.current) {
      // distance between current position and the last saved
      const glowDistance = getDistance(
        { x: mouseX, y: mouseY },
        lastGlowPosition.current
      );
      // calculating amount of glow elements to fit in the distance
      const glowQuantity = Math.max(Math.floor(glowDistance / 10), 1);
      // delta distances
      const dx = (mouseX - lastGlowPosition.current.x) / glowQuantity;
      const dy = (mouseY - lastGlowPosition.current.y) / glowQuantity;
      // forming array and generating glow elements for each delta distance
      Array.from(Array(glowQuantity)).forEach((_, index) => {
        const x = lastGlowPosition.current!.x + dx * index;
        const y = lastGlowPosition.current!.y + dy * index;

        setGlow((prev) => {
          const newId = crypto.randomUUID();
          return [
            ...prev,
            {
              id: newId,
              x,
              y,
              ttl: setTimeout(() => removeGlow(newId), 200),
            },
          ];
        });
      });
    }
    // saving last glow element position
    lastGlowPosition.current = { x: mouseX, y: mouseY };

    // calculating distance between the last remnant position and the mouse
    const distanceToLastRemnant = getDistance(lastRemnantPosition.current, {
      x: mouseX,
      y: mouseY,
    });
    // debouncing based on time passed and distance traveled
    if (deBouncer.current && distanceToLastRemnant < 100) return;
    // debouncing operations
    if (!deBouncer.current) {
      // if debounced based on time passed starting a new interval
      deBouncer.current = true;
      setTimeout(() => (deBouncer.current = false), 100);
    }
    // updating last remnant position
    lastRemnantPosition.current = { x: mouseX, y: mouseY };

    // animation function
    const animate = () => {
      // random id ensures that react will track each remnant individually
      const newId = crypto.randomUUID();
      // selecting random animation
      const animationClass = getRandomArrayElement(randomAnimation);
      const newItem: IRemanant = {
        id: newId,
        x: mouseX,
        y: mouseY,
        // selecting random color
        backgroundColor: getRandomArrayElement(randomColors),
        // cleanup timeout for each remnant
        ttl: setTimeout(() => removeRemnant(newId), 750),
        animationClass,
      };
      setRemnants((prev) => [...prev, newItem]);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mouseX, mouseY]);

  // remnant elements
  const content = remnants.map((item) => (
    <svg
      key={`star${item.id}`}
      className={`${styles.remnant} ${styles[item.animationClass]}`}
      viewBox="0 0 296 296"
      style={{
        left: `${item.x}px`,
        top: `${item.y}px`,
        fill: item.backgroundColor,
      }}
    >
      <Snowflake />
    </svg>
  ));
  // glow elements
  const glowContent = glow.map((item) => (
    <div
      key={`glow${item.id}`}
      className={styles.glow}
      style={{
        left: `${item.x}px`,
        top: `${item.y}px`,
      }}
    ></div>
  ));
  return (
    <>
      {glowContent}
      {content}
    </>
  );
}

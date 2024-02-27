"use client";
import useMouseMove from "@/hooks/useMouseMove";
import styles from "./startrail.module.css";
import { useEffect, useRef, useState } from "react";
import getRandomArrayElement from "@/utils/getRandomArrayElement";
import getDistance from "@/utils/getDistance";

interface IRemanant {
  id: string;
  x: number;
  y: number;
  ttl: NodeJS.Timeout;
  backgroundColor: string;
  animationClass: string;
}

const randomColors = ["gold", "greenyellow", "crimson", "hotpink", "aqua"];
const randomAnimation = ["fallingDown1", "fallingDown2", "fallingDown3"];

export default function StarTrail() {
  // mouse coordinates
  const { mouseX, mouseY } = useMouseMove();
  // remnants array
  const [remnants, setRemnants] = useState<IRemanant[]>([]);

  // cleanup function. removes remnant with id from the array
  const removeRemnant = (id: string) => {
    setRemnants((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  // debouncing
  // debouncing is done based on time passed tracked by deBouncer and
  // distance travelled calculated from lastRemnantPosition and current mouse position
  const deBouncer = useRef(false);
  const lastRemnantPosition = useRef<{ x: number; y: number }>({
    x: -200,
    y: 800,
  });

  useEffect(() => {
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

  const content = remnants.map((item) => (
    <div
      key={`star${item.id}`}
      className={`${styles.remnant} ${styles[item.animationClass]}`}
      style={{
        left: `${item.x}px`,
        top: `${item.y}px`,
        backgroundColor: item.backgroundColor,
      }}
    ></div>
  ));
  return <>{content}</>;
}

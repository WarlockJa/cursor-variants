"use client";
import {
  motion,
  animate,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useEffect } from "react";
import styles from "./auroraeffect.module.css";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export default function AuroraEffect() {
  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #fff0 50%, ${color})`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);
  return (
    <motion.section style={{ backgroundImage }} className={styles.aurora} />
  );
}

"use client";
import useMouseMove from "@/hooks/useMouseMove";
import styles from "./circlecursor.module.css";
import useCircleCursorData from "./hooks/useCircleCursorData";

const CIRCLE_RADIUS = 20;
const INCREMENT = 0.5;

export default function CircleChaser() {
  const { mouseX, mouseY } = useMouseMove();
  const { circleX, circleY, transformationString } = useCircleCursorData({
    mouseX: mouseX - CIRCLE_RADIUS,
    mouseY: mouseY - CIRCLE_RADIUS,
    increment: INCREMENT,
  });

  return (
    <div
      className={styles.circle}
      style={{ top: circleY, left: circleX, transform: transformationString }}
    ></div>
  );
}

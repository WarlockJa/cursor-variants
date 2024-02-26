import { vectorMagnitude } from "./myMath";

export default function getCircleTransformationString(speedVector: {
  x: number;
  y: number;
  increment: number;
}) {
  const scale =
    (vectorMagnitude(speedVector) / (speedVector.increment * 40)) * 0.5;
  const speedVectorAngleRad = Math.atan2(speedVector.y, speedVector.x);
  return `rotate(${speedVectorAngleRad}rad) scale(${1 + scale},${1 - scale})`;
}

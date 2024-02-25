import { nthTriangularNumber } from "./myMath";

export default function getAcceleration1D({
  mousePos,
  circlePos,
  speedVector,
  increment,
  proportion,
}: {
  mousePos: number;
  circlePos: number;
  speedVector: number;
  increment: number;
  proportion: number;
}): { acceleration: number; distance: number } {
  let acceleration = 0;
  // calculating distance
  const distance = Math.abs(mousePos - circlePos);
  if (distance === 0) return { acceleration: 0, distance: 0 };

  // calculating relative position for the circle to the cursor
  const directionNeededIsForward = mousePos > circlePos ? 1 : -1; // if true direction is FORWARD else BACKWARDS

  // checking if current speed vector is aligned with the direction towards mouse position
  if (speedVector * directionNeededIsForward < 0) {
    // accelerating against the current speed vector
    acceleration = directionNeededIsForward * increment * proportion;
  } else {
    // nthTriangularNumber(speedVector) - is the distance that circle would have to travel
    // before coming to a full stop.
    // decelerating: If nthTriangularNumber(speedVector) greater than the current distance
    // accelerating: if nthTriangularNumber(speedVector) less than the current distance
    acceleration =
      nthTriangularNumber(speedVector, increment * proportion) >= distance
        ? -directionNeededIsForward * increment * proportion
        : directionNeededIsForward * increment * proportion;
  }

  return { acceleration, distance };
}

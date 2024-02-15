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
  if (distance > 0) {
    // calculating relative position for the circle to the cursor
    const directionNeededIsForward = mousePos - circlePos > 0; // > 0 direction FORWARD else BACKWARDS
    // checking if current speed vector is towards the cursor
    if (directionNeededIsForward) {
      // speed vector is away from the cursor
      if (speedVector < 0) {
        // accelerating FORWARD
        acceleration = increment * proportion;
      } else {
        // nthTriangularNumber(speedVector) - is the distance that circle would have to travel
        // before coming to a full stop.
        // decelerating: If nthTriangularNumber(speedVector) greater than the current distance
        // accelerating: if nthTriangularNumber(speedVector) less than the current distance
        acceleration =
          nthTriangularNumber(speedVector, increment * proportion) >= distance
            ? -increment * proportion
            : increment * proportion;
      }
    } else {
      // speed vector is away from the cursor
      if (speedVector > 0) {
        // accelerating BACKWARDS
        acceleration = -increment * proportion;
      } else {
        // nthTriangularNumber(speedVector) - is the distance that circle would have to travel
        // before coming to a full stop.
        // decelerating: If nthTriangularNumber(speedVector) greater than the current distance
        // accelerating: if nthTriangularNumber(speedVector) less than the current distance
        acceleration =
          nthTriangularNumber(speedVector, increment * proportion) >= distance
            ? increment * proportion
            : -increment * proportion;
      }
    }
  }

  return { acceleration, distance };
}

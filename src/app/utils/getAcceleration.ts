import { nthTriangularNumber } from "./myMath";

interface ICoordinates {
  x: number;
  y: number;
}

export const getAcceleration = ({
  mousePos,
  circlePos,
  speedVector,
  increment,
}: {
  mousePos: ICoordinates;
  circlePos: ICoordinates;
  speedVector: ICoordinates;
  increment: number;
}): { acceleration: ICoordinates } => {
  // function calculateAcceleration(point_A, point_B, velocity_A) {
  const acceleration = { x: 0, y: 0 };

  // Calculate the vector from point A to point B
  const direction_vector = {
    x: mousePos.x - circlePos.x,
    y: mousePos.y - circlePos.y,
  };

  // Calculate the distance between point A and point B
  const dist = Math.sqrt(direction_vector.x ** 2 + direction_vector.y ** 2);

  // Scale the direction vector to have a magnitude of 1
  if (dist != 0) {
    direction_vector.x = direction_vector.x / dist;
    direction_vector.y = direction_vector.y / dist;
  }

  // Update the acceleration vector of point A
  acceleration.x = direction_vector.x;
  acceleration.y = direction_vector.y;

  // Decelerate if overshooting
  if (dist < 1) {
    acceleration.x *= dist;
    acceleration.y *= dist;
  }

  // Adjust the acceleration based on the current velocity vector
  // acceleration.x -= speedVector.x;
  // acceleration.y -= speedVector.y;

  return { acceleration };
};

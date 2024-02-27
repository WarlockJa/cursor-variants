interface IDot {
  x: number;
  y: number;
}
export default function getDistance(pointA: IDot, pointB: IDot) {
  return Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  );
}

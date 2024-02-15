// this function takes a number N and an increment I and returns a sum of a progression
// sum = (N - I*0) + (N - I*1) + ... (N - I*n) where I*n <= N
export function nthTriangularNumber(n: number, increment: number) {
  const absNumber = Math.abs(n);
  const absIncrement = Math.abs(increment);
  let result = absNumber;
  let nextStep = absNumber - absIncrement;
  while (nextStep >= absIncrement) {
    result += nextStep;
    nextStep -= absIncrement;
  }
  result += nextStep;

  return result;
  // return ((n * (n + 1)) / 2) * increment;
}

export function distanceBetweenTwoPoints({
  x1,
  x2,
  y1,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export function calculateDirectionVector({
  x1,
  x2,
  y1,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const magnitude = Math.sqrt(dx * dx + dy * dy);
  return {
    x: dx / magnitude,
    y: dy / magnitude,
  };
}

export function vectorMagnitude({ x, y }: { x: number; y: number }) {
  return Math.sqrt(x * x + y * y);
}

export function changeSpeedVector({
  targetX,
  targetY,
  speedVectorX,
  speedVectorY,
  speedChangeMagnitude,
}: {
  targetX: number;
  targetY: number;
  speedVectorX: number;
  speedVectorY: number;
  speedChangeMagnitude: number;
}) {
  const direction = calculateDirectionVector({
    x1: 0,
    y1: 0,
    x2: targetX,
    y2: targetY,
  }); // Get normalized direction vector from point 1 to point 2
  const newSpeedVector = {
    x: speedVectorX + direction.x * speedChangeMagnitude, // Add the direction vector to the speed vector of point 1
    y: speedVectorY + direction.y * speedChangeMagnitude,
  };
  return newSpeedVector;
}

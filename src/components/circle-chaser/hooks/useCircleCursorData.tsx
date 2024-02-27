import getAcceleration1D from "@/components/circle-chaser/utils/getAcceleration1D";
import getCircleTransformationString from "@/components/circle-chaser/utils/getCircleTransformationString";
import { useEffect, useState } from "react";

export default function useCircleCursorData({
  mouseX,
  mouseY,
  increment,
}: {
  mouseX: number;
  mouseY: number;
  increment: number;
}) {
  const [circleData, setCircleData] = useState({
    circlePos: { x: -200, y: 800 },
    speedVector: { x: 0, y: 0 },
    transformationString: "",
  });

  useEffect(() => {
    const animate = () => {
      // Calculate the vector from Circle position to Mouse position
      const directionVector = {
        x: mouseX - circleData.circlePos.x,
        y: mouseY - circleData.circlePos.y,
      };

      // sum of absolute values for direction vector coordinates to be used in proportion calculation
      const directionVectorSum =
        Math.abs(directionVector.x) + Math.abs(directionVector.y);

      // calculating proportion for each axis coordinate based on the direction vector
      // these proportions will be applied to the acceleration vector to ensure
      // that its magnitude does not exceed INCREMENT value
      const directionVectorProportionX =
        directionVectorSum === 0
          ? 0
          : (Math.abs(directionVector.x) * 100) / directionVectorSum / 100;
      const directionVectorProportionY =
        directionVectorSum === 0 ? 0 : 1 - directionVectorProportionX;

      // calculating acceleration vector for each axis coordinate
      const { acceleration: accelerateX, distance: distanceX } =
        getAcceleration1D({
          circlePos: circleData.circlePos.x,
          mousePos: mouseX,
          speedVector: circleData.speedVector.x,
          increment,
          proportion: directionVectorProportionX,
        });

      const { acceleration: accelerateY, distance: distanceY } =
        getAcceleration1D({
          circlePos: circleData.circlePos.y,
          mousePos: mouseY,
          speedVector: circleData.speedVector.y,
          increment,
          proportion: directionVectorProportionY,
        });

      // new speed vector data
      const speedVectorX = circleData.speedVector.x + accelerateX;
      const speedVectorY = circleData.speedVector.y + accelerateY;

      // proximity flags to stop animation within marginal deviation
      const proximityFlagX =
        Math.abs(speedVectorX) <= increment * directionVectorProportionX &&
        distanceX < 5;
      const proximityFlagY =
        Math.abs(speedVectorY) <= increment * directionVectorProportionY &&
        distanceY < 5;

      // new circle coordinates
      const newCircleX = proximityFlagX
        ? mouseX
        : circleData.circlePos.x + speedVectorX;
      const newCircleY = proximityFlagY
        ? mouseY
        : circleData.circlePos.y + speedVectorY;

      // new speed vector
      const newSpeedVectorX = proximityFlagX ? 0 : speedVectorX;
      const newSpeedVectorY = proximityFlagY ? 0 : speedVectorY;

      // saving animation step data.
      setCircleData(() => ({
        circlePos: { x: newCircleX, y: newCircleY },
        speedVector: {
          x: newSpeedVectorX,
          y: newSpeedVectorY,
        },
        transformationString: getCircleTransformationString({
          x: newSpeedVectorX,
          y: newSpeedVectorY,
          increment,
        }),
      }));
    };

    const animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [
    circleData.circlePos.x,
    circleData.circlePos.y,
    mouseX,
    mouseY,
    circleData.speedVector.x,
    circleData.speedVector.y,
  ]);

  return {
    circleX: circleData.circlePos.x,
    circleY: circleData.circlePos.y,
    transformationString: circleData.transformationString,
  };
}

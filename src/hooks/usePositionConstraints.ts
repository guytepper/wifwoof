import { useState, useEffect, useRef } from "react";
import { Position } from "../types";
import { ROTATION_ANGLES } from "../constants";

export const usePositionConstraints = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>(() => {
    const saved = localStorage.getItem("numberPosition");
    return saved ? JSON.parse(saved) : { x: 0, y: 0, rotate: 0 };
  });

  const constrainPosition = () => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const rect = element.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const isInRightHalf = position.x > 0;
    const isInTopHalf = position.y < 0;

    const newX = isInRightHalf
      ? windowWidth / 2 - rect.width / 2
      : -windowWidth / 2 + rect.width / 2;

    const newY = isInTopHalf
      ? -windowHeight / 2 + rect.height / 2
      : windowHeight / 2 - rect.height / 2;

    const newRotation = isInTopHalf
      ? isInRightHalf
        ? ROTATION_ANGLES.topRight
        : ROTATION_ANGLES.topLeft
      : isInRightHalf
      ? ROTATION_ANGLES.bottomRight
      : ROTATION_ANGLES.bottomLeft;

    if (
      newX !== position.x ||
      newY !== position.y ||
      newRotation !== position.rotate
    ) {
      setPosition((prev) => ({
        ...prev,
        x: newX,
        y: newY,
        rotate: newRotation,
      }));
    }
  };

  useEffect(() => {
    const handleResize = () => constrainPosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position]);

  return { elementRef, position, setPosition };
};

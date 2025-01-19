import { motion, PanInfo } from "motion/react";
import NumberFlow, { continuous } from "@number-flow/react";
import { Position } from "../types";
import { MOTION_SPRING, PRICE_FORMAT, ROTATION_ANGLES } from "../constants";

interface DraggablePriceProps {
  price: number;
  elementRef: React.RefObject<HTMLDivElement>;
  position: Position;
  setPosition: (position: Position | ((prev: Position) => Position)) => void;
}

export const DraggablePrice = ({ price, elementRef, position, setPosition }: DraggablePriceProps) => {
  const handleDrag = (_: any, info: any) => {
    const windowCenter = window.innerWidth / 2;
    const windowHeight = window.innerHeight / 2;
    const isRight = info.point.x > windowCenter;
    const isTop = info.point.y < windowHeight;

    const rotation = isTop
      ? isRight
        ? ROTATION_ANGLES.topRight
        : ROTATION_ANGLES.topLeft
      : isRight
        ? ROTATION_ANGLES.bottomRight
        : ROTATION_ANGLES.bottomLeft;

    setPosition((prev) => ({
      ...prev,
      rotate: rotation,
    }));
  };

  const handleDragEnd = (_, info: PanInfo) => {
    const newPosition = {
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
      rotate: position.rotate,
    };
    setPosition(newPosition);
    localStorage.setItem("numberPosition", JSON.stringify(newPosition));
  };

  return (
    <motion.div
      ref={elementRef}
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.1 }}
      // @ts-expect-error
      initial={position}
      // @ts-expect-error
      animate={position}
      transition={MOTION_SPRING}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <NumberFlow value={price} format={PRICE_FORMAT} plugins={[continuous]} className="price" />
    </motion.div>
  );
};

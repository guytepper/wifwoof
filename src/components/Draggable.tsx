import { motion, MotionProps, PanInfo } from "motion/react";
import React, { ReactNode, useState } from "react";

interface DraggableProps extends MotionProps {
  children: ReactNode;
  className?: string;
  onPositionChange?: (x: number, y: number) => void;
}

const Draggable: React.FC<DraggableProps> = ({ children, className, onPositionChange, ...props }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragEnd = (_, info: PanInfo) => {
    const newPosition = {
      x: position.x + info.offset.x,
      y: position.y + info.offset.y,
    };

    setPosition(newPosition);
  };

  return (
    <motion.div
      style={{ cursor: "grab" }}
      drag
      dragMomentum={false}
      initial={position}
      animate={position}
      whileDrag={{ scale: 2.05, cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
      className={`${className || ""}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Draggable;

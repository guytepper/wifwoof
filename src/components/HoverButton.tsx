import { motion } from "motion/react";

interface HoverButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function HoverButton({ children, onClick }: HoverButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.85 }} onClick={onClick} style={{ cursor: "pointer" }}>
      {children}
    </motion.div>
  );
}

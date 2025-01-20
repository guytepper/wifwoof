import { motion } from "motion/react";
import { HoverButton } from "./HoverButton";
import { SoundOffIcon, SoundOnIcon } from "./Icons";

interface SoundToggleButtonProps {
  isSoundOn: boolean;
  setIsSoundOn: (isSoundOn: boolean) => void;
}

export function SoundToggleButton({ isSoundOn, setIsSoundOn }: SoundToggleButtonProps) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "1rem", userSelect: "none" }}
      onClick={() => setIsSoundOn(!isSoundOn)}
    >
      <HoverButton>
        {isSoundOn ? <SoundOffIcon width={40} height={40} /> : <SoundOnIcon width={40} height={40} />}
      </HoverButton>

      <motion.div animate={{ scale: isSoundOn ? 0 : 1, opacity: isSoundOn ? 0 : 1 }} style={{ cursor: "pointer" }}>
        <span style={{ fontSize: "calc(var(--step-0) * 0.5)" }}>turn barks on!</span>
      </motion.div>
    </div>
  );
}

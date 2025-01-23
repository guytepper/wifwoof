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
        {isSoundOn ? (
          <SoundOffIcon width={40} height={40} stroke="#fff" />
        ) : (
          <SoundOnIcon width={40} height={40} stroke="#fff" />
        )}
      </HoverButton>

      <motion.div
        key={isSoundOn ? "on" : "off"}
        initial={false}
        animate={{ opacity: [1, 1, 1, 0], x: isSoundOn ? [-10, 20] : [20, -10] }}
        transition={{ duration: 0.4 }}
        style={{ cursor: "pointer" }}
      >
        <span style={{ fontSize: "calc(var(--step-0) * 0.5)", color: "#fff" }}>sound {isSoundOn ? "on" : "off"}</span>
      </motion.div>
    </div>
  );
}

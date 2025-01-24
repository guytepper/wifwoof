import { motion } from "framer-motion";
import { createCallable } from "react-call";
import { BaseDialog } from "../BaseDialog/BaseDialog";
import toy2 from "@/assets/toy2.mp3";
import { useMemo } from "react";

// We only want to play the sound initially - the same sound is played when the "paw" button is clicked
let hasPlayed = false;

export const OnboardingDialog = createCallable(({ call }) => {
  const audioRef = useMemo(() => new Audio(toy2), []);

  const close = () => {
    if (!hasPlayed) {
      audioRef.play();
      hasPlayed = true;
    }
    call.end();
  };

  return (
    <BaseDialog call={call}>
      <div>
        <h2 style={{ fontSize: 48, margin: 0, fontWeight: 500, marginBottom: 12 }}>welcome to wifwoof</h2>

        <h3 style={{ fontSize: 34, margin: 0, fontWeight: 500, marginBottom: 24, textDecoration: "underline" }}>
          the rules:
        </h3>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
            <span>📈 price up</span>
            <span>dog barks 🗣️</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
            <span>📉 price down</span>
            <span>dog whines 😢</span>
          </div>
        </div>
      </div>
      <motion.button
        onClick={close}
        style={{
          backgroundColor: "var(--pink-9)",
          color: "white",
          borderRadius: 4,
          padding: "8px 16px",
          fontSize: 24,
          width: 250,
          fontFamily: "Bangers",
          appearance: "none",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 0 2px var(--pink-4), 0 0 0 6px var(--pink-9)",
        }}
        whileHover={{
          scale: 1.1,
          rotate: 5,
        }}
        whileTap={{
          scale: 0.9,
          rotate: 0,
        }}
      >
        <span>got it</span>
      </motion.button>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginTop: 24, marginBottom: 0, fontSize: 18, opacity: 0.8 }}>
          join the fun on&nbsp;
          <motion.a
            href="https://twitter.com/guytepper"
            target="_blank"
            rel="noopener noreferrer"
            transition={{ duration: 0.01 }}
          >
            twitter
          </motion.a>
          &nbsp;&&nbsp;
          <a href="https://github.com/guytepper/wifwoof" target="_blank" rel="noopener noreferrer">
            github
          </a>
        </p>
      </div>
    </BaseDialog>
  );
}, 600);

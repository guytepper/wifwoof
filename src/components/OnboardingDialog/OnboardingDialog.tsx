import { useMemo } from "react";
import { motion } from "framer-motion";
import { createCallable } from "react-call";
import { BaseDialog } from "../BaseDialog/BaseDialog";
import toy2 from "@/assets/toy2.mp3";
import styles from "./OnboardingDialog.module.css";

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
        <h2 className={styles.title}>welcome to wifwoof</h2>
        <h3 className={styles.subtitle}>the rules:</h3>

        <div style={{ marginBottom: 32 }}>
          <div className={styles.rule}>
            <span>📈 price up</span>
            <span>dog barks 🗣️</span>
          </div>
          <div className={styles.rule}>
            <span>📉 price down</span>
            <span>dog whines 😢</span>
          </div>
        </div>
      </div>
      <motion.button
        onClick={close}
        className={styles.closeButton}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9, rotate: 0 }}
      >
        <span>got it</span>
      </motion.button>
      <div style={{ textAlign: "center" }}>
        <p style={{ marginTop: 24, marginBottom: 0, fontSize: 18, opacity: 0.8 }}>
          join the fun on&nbsp;
          <motion.a href="https://twitter.com/guytepper" target="_blank" rel="noopener noreferrer">
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

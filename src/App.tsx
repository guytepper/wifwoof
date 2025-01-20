import { useEffect, useMemo, useState } from "react";
import { usePrice, useThemeColor } from "@/hooks";
import { motion } from "motion/react";
import { PRICE_FORMAT } from "./constants";
import NumberFlow, { continuous } from "@number-flow/react";
import { SoundOnIcon, SoundOffIcon, PawIcon } from "@/components/Icons";
import toy from "@/assets/toy.mp3";

import dog from "@/assets/dogwifhat.webp";
import "@/App.css";
import { HoverButton } from "./components/HoverButton";

const Price = motion.create(NumberFlow);

const toySound = new Audio(toy);

function App() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const { price, bgColor, shouldPopHappy, shouldPopSad } = usePrice({ mute: !isSoundOn });
  const animateDog = useAnimateDog(shouldPopHappy, shouldPopSad);

  useThemeColor(bgColor);

  useEffect(() => {
    if (isSoundOn) {
      toySound.pause();
      toySound.currentTime = 0;
      toySound.play().catch((err) => console.error("Error playing sound:", err));
    }
  }, [isSoundOn]);

  return (
    <div className="App" style={{ backgroundColor: bgColor, transition: "background-color 0.6s" }}>
      <header className="header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", userSelect: "none" }}>
          <HoverButton onClick={() => setIsSoundOn(!isSoundOn)}>
            {isSoundOn ? <SoundOffIcon width={40} height={40} /> : <SoundOnIcon width={40} height={40} />}
          </HoverButton>

          <motion.div animate={{ scale: isSoundOn ? 0 : 1, opacity: isSoundOn ? 0 : 1 }}>
            <span style={{ fontSize: "calc(var(--step-0) * 0.5)" }}>turn barks on!</span>
          </motion.div>
        </div>

        <div>
          <HoverButton onClick={() => {}}>
            <PawIcon width={40} height={40} />
          </HoverButton>
        </div>
      </header>

      <Price
        value={price}
        format={PRICE_FORMAT}
        plugins={[continuous]}
        className="price"
        style={{ y: "-26vh", userSelect: "none" }}
      />

      <motion.div
        style={{ position: "absolute", y: "50vh" }}
        animate={animateDog}
        whileHover={{ scale: 1.1, y: "45vh" }}
      >
        <img src={dog} alt="dogwifhat" className="dogwifhat" />
      </motion.div>
    </div>
  );
}

export default App;

const useAnimateDog = (shouldPopHappy: boolean, shouldPopSad: boolean) => {
  return useMemo(() => {
    if (shouldPopHappy) {
      return {
        scale: 1.25,
        y: "35vh",
      };
    } else if (shouldPopSad) {
      return {
        scale: 1,
        y: "50vh",
        rotate: [0, -5, 5, -5, 5, 0],
        transition: {
          rotate: {
            repeat: Infinity,
            duration: 0.5,
            ease: "linear",
          },
        },
      };
    }
  }, [shouldPopHappy, shouldPopSad]);
};

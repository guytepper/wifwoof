import { useEffect, useState } from "react";
import { usePrice, useThemeColor } from "@/hooks";
import { motion } from "motion/react";
import { PRICE_FORMAT } from "@/constants";
import NumberFlow, { continuous } from "@number-flow/react";
import { HoverButton, SoundToggleButton, DogWifHat, PawIcon } from "@/components";
import { InfoDialog } from "@/components/InfoDialog";

import toy from "@/assets/toy.mp3";
import toy2 from "@/assets/toy2.mp3";

import "@/App.css";

const Price = motion.create(NumberFlow);
const toySound = new Audio(toy);
const toySound2 = new Audio(toy2);
function App() {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const { price, bgColor, shouldPopHappy, shouldPopSad } = usePrice({ mute: !isSoundOn });

  useThemeColor(bgColor);

  useEffect(() => {
    if (isSoundOn) {
      toySound.pause();
      toySound.currentTime = 0;
      toySound.play().catch((err) => console.error("Error playing sound:", err));
    }
  }, [isSoundOn]);

  // useEffect(() => {
  //   InfoDialog.call();
  // }, []);

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <header className="header">
        <motion.div whileHover={{ rotate: -7, scale: 1.05 }}>
          <SoundToggleButton isSoundOn={isSoundOn} setIsSoundOn={setIsSoundOn} />
        </motion.div>

        <motion.div whileHover={{ rotate: 10, scale: 1.1 }} whileTap={{ scale: 0.85 }}>
          <HoverButton
            onClick={() => {
              toySound2.play();
              InfoDialog.call();
            }}
          >
            <PawIcon width={40} height={40} />
          </HoverButton>
        </motion.div>
      </header>

      <Price
        value={price}
        format={PRICE_FORMAT}
        plugins={[continuous]}
        className="price"
        style={{
          y: "-26vh",
          userSelect: "none",
        }}
      />

      <DogWifHat shouldPopHappy={shouldPopHappy} shouldPopSad={shouldPopSad} />

      <InfoDialog.Root />
    </div>
  );
}

export default App;

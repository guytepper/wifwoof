import { useEffect, useState } from "react";
import { usePrice, useThemeColor } from "@/hooks";
import { motion } from "motion/react";
import { PRICE_FORMAT } from "@/constants";
import NumberFlow, { continuous } from "@number-flow/react";
import { HoverButton, SoundToggleButton, DogWifHat, PawIcon } from "@/components";
import toy from "@/assets/toy.mp3";

import "@/App.css";

const Price = motion.create(NumberFlow);
const toySound = new Audio(toy);

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

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <header className="header">
        <SoundToggleButton isSoundOn={isSoundOn} setIsSoundOn={setIsSoundOn} />

        <div>
          <HoverButton>
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

      <DogWifHat shouldPopHappy={shouldPopHappy} shouldPopSad={shouldPopSad} />
    </div>
  );
}

export default App;

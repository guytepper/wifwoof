import { usePrice } from "@/hooks/usePrice";
import { motion } from "motion/react";
import { PRICE_FORMAT } from "./constants";
import NumberFlow, { continuous } from "@number-flow/react";
import dog from "@/assets/dogwifhat_sticker.webp";
import { useMemo, useState } from "react";
import { SoundOnIcon, SoundOffIcon } from "@/components/Icons";
import "@/App.css";

const Price = motion.create(NumberFlow);

function App() {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const { price, bgColor, shouldPopHappy, shouldPopSad } = usePrice({ mute: !isSoundOn });

  const animateDog = useMemo(() => {
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

  return (
    <div className="App" style={{ backgroundColor: bgColor, transition: "background-color 0.3s" }}>
      <header>
        <motion.div
          whileHover={{ scale: 1.2, origin: "center", cursor: "pointer" }}
          onClick={() => setIsSoundOn(!isSoundOn)}
        >
          {isSoundOn ? <SoundOffIcon width={40} height={40} /> : <SoundOnIcon width={40} height={40} />}
        </motion.div>
      </header>

      <Price value={price} format={PRICE_FORMAT} plugins={[continuous]} className="price" style={{ y: "-30vh" }} />

      <motion.div
        style={{ position: "absolute", y: "50vh" }}
        animate={animateDog}
        whileHover={{ scale: 1.1, y: "45vh" }}
      >
        <img
          src={dog}
          alt="dog wif hat"
          style={{ width: "300px", height: "300px", userSelect: "none", pointerEvents: "none" }}
        />
      </motion.div>
    </div>
  );
}

export default App;

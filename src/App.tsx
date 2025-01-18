import { usePrice } from "@/hooks/usePrice";
import "@/App.css";
import { motion } from "motion/react";
import { PRICE_FORMAT } from "./constants";
import NumberFlow, { continuous } from "@number-flow/react";

import dog from "@/assets/dogwifhat_sticker.webp";

const Price = motion.create(NumberFlow);

function App() {
  const { price, bgColor, shouldPop } = usePrice();

  return (
    <div className="App" style={{ backgroundColor: bgColor, transition: "background-color 0.3s" }}>
      <Price value={price} format={PRICE_FORMAT} plugins={[continuous]} className="price" style={{ y: "-30vh" }} />

      <motion.div
        style={{ position: "absolute", y: "50vh" }}
        animate={{
          scale: shouldPop ? 1.25 : 1,
          y: shouldPop ? "35vh" : "50vh",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        whileHover={{
          scale: 1.2,
          y: "45vh",
        }}
      >
        <img
          src={dog}
          alt="dog wif hat"
          style={{
            userSelect: "none",
            pointerEvents: "none",
            width: "300px",
            height: "300px",
          }}
        />
      </motion.div>
      {/* <DraggablePrice price={price} elementRef={elementRef} position={position} setPosition={setPosition} /> */}
    </div>
  );
}

export default App;

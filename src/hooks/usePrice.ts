import { useState, useEffect } from "react";
import { PRICE_CONFIG } from "../constants";

import bark from "@/assets/bark.mp3";
const barkSound = new Audio(bark);

export const usePrice = () => {
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [bgColor, setBgColor] = useState("var(--blue-9)");
  const [shouldPop, setShouldPop] = useState(false);

  // Dummy price generator
  useEffect(() => {
    const interval = setInterval(() => {
      const newPrice =
        Math.random() * (PRICE_CONFIG.max - PRICE_CONFIG.min) +
        PRICE_CONFIG.min;
      setPrice(newPrice);
    }, PRICE_CONFIG.interval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prevPrice > 0) {
      const percentageChange = ((price - prevPrice) / prevPrice) * 100;
      if (percentageChange >= 0.1) {
        setBgColor("var(--grass-9)");

        barkSound.play();
        setShouldPop(true);
        setTimeout(() => setShouldPop(false), 300);
      } else if (percentageChange <= -0.1) {
        setBgColor("var(--tomato-9)");
      }
    }
    setPrevPrice(price);
  }, [price, prevPrice]);

  return { price, bgColor, shouldPop };
};

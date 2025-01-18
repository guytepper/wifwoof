import { useState, useEffect } from "react";
import { PRICE_CONFIG } from "../constants";

export const usePrice = () => {
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [bgColor, setBgColor] = useState("var(--blue-9)");

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
      } else if (percentageChange <= -0.1) {
        setBgColor("var(--tomato-9)");
      }
    }
    setPrevPrice(price);
  }, [price, prevPrice]);

  return { price, bgColor };
};

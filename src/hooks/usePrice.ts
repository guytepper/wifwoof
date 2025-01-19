import { useState, useEffect } from "react";

import bark from "@/assets/bark.mp3";
import sadDog from "@/assets/sad-dog.mp3";
import { ref, onValue } from "firebase/database";
import { db } from "@/config/firebase-config";

const barkSound = new Audio(bark);
const sadDogSound = new Audio(sadDog);

const priceRef = ref(db, "price");

export const usePrice = ({ mute }: { mute: boolean }) => {
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [bgColor, setBgColor] = useState("var(--blue-9)");

  const [shouldPopHappy, setShouldPopHappy] = useState(false);
  const [shouldPopSad, setShouldPopSad] = useState(false);

  // Dummy price generator
  useEffect(() => {
    const unsubscribe = onValue(priceRef, (snapshot) => {
      const { rate } = snapshot.val() as { rate: number };
      setPrice(rate);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (prevPrice > 0) {
      const percentageChange = ((price - prevPrice) / prevPrice) * 100;
      if (percentageChange >= 0.1) {
        setBgColor("var(--grass-9)");

        if (!mute) {
          barkSound.play();
        }

        setShouldPopHappy(true);
        setTimeout(() => setShouldPopHappy(false), 300);
      } else if (percentageChange <= -0.1) {
        setBgColor("var(--tomato-9)");

        if (!mute) {
          sadDogSound.play();
        }

        setShouldPopSad(true);
        setTimeout(() => setShouldPopSad(false), 500);
      }
    }
    setPrevPrice(price);
  }, [price, prevPrice, mute]);

  return { price, bgColor, shouldPopHappy, shouldPopSad };
};

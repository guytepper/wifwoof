import { useState, useEffect } from "react";

import bark from "@/assets/bark.mp3";
import sadDog from "@/assets/sad-dog.mp3";
import { ref, onValue } from "firebase/database";
import { db } from "@/config/firebase-config";

const barkSound = new Audio(bark);
const sadDogSound = new Audio(sadDog);

const priceRef = ref(db, "price");
const faviconElm: HTMLLinkElement = document.querySelector('link[rel~="icon"]');
const faviconEmoji = (emoji: string) =>
  `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`;

export const usePrice = ({ mute }: { mute: boolean }) => {
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);
  const [bgColor, setBgColor] = useState("var(--blue-9)");

  const [shouldPopHappy, setShouldPopHappy] = useState(false);
  const [shouldPopSad, setShouldPopSad] = useState(false);

  useEffect(() => {
    let unsubscribe: () => void;

    // Mock price for development
    if (import.meta.env.MODE === "development") {
      const updatePrice = () => {
        const newPrice = Math.random() * (1.422421 - 1.412381) + 1.412381;
        setPrice(newPrice);
      };

      const intervalId = setInterval(updatePrice, 10000); // Update price every 10 seconds
      updatePrice(); // Update price initially
      unsubscribe = () => {
        clearInterval(intervalId);
      };
    } else {
      // Listen to price changes from Firebase Realtime Database
      unsubscribe = onValue(priceRef, (snapshot) => {
        const { rate } = snapshot.val() as { rate: number };
        setPrice(rate);
      });
    }

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (prevPrice > 0) {
      const percentageChange = ((price - prevPrice) / prevPrice) * 100;
      if (percentageChange >= 0.01) {
        if (!mute) {
          barkSound.play();
        }

        setShouldPopHappy(true);
        setBgColor("var(--grass-9)");
        setTimeout(() => setShouldPopHappy(false), 300);
        faviconElm.href = faviconEmoji("🐂");
      } else if (percentageChange <= -0.01) {
        setBgColor("var(--tomato-9)");

        if (!mute) {
          sadDogSound.play();
        }

        setShouldPopSad(true);
        setTimeout(() => setShouldPopSad(false), 300);
        faviconElm.href = faviconEmoji("🐻");
      }
    }

    setPrevPrice(price);
  }, [price, prevPrice, mute]);

  return { price, bgColor, shouldPopHappy, shouldPopSad };
};

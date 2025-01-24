import { motion } from "motion/react";
import { useMemo } from "react";

interface DogWifHatProps {
  shouldPopHappy: boolean;
  shouldPopSad: boolean;
}

export function DogWifHat(props: DogWifHatProps) {
  const { shouldPopHappy, shouldPopSad } = props;
  const animateDog = useAnimateDog(shouldPopHappy, shouldPopSad);

  return (
    <motion.div
      style={{ position: "absolute", y: "50vh", cursor: "not-allowed" }}
      animate={animateDog}
      whileHover={{ scale: 1.1, y: "45vh" }}
    >
      <picture>
        <source srcSet="/images/dogwifhat.avif" type="image/avif" />
        <source srcSet="/images/dogwifhat.webp" type="image/webp" />
        <img src="/images/dogwifhat.webp" alt="dogwifhat" className="dogwifhat" />
      </picture>
    </motion.div>
  );
}

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
        rotate: [0, -7, 9, -5, 6, 0],
        transition: {
          rotate: {
            duration: 0.5,
            ease: "linear",
          },
        },
      };
    }
  }, [shouldPopHappy, shouldPopSad]);
};

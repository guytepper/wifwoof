export const MOTION_SPRING = {
  type: "spring" as const,
  damping: 20,
  stiffness: 100,
  mass: 0.5,
};

export const PRICE_FORMAT = {
  style: "currency" as const,
  currency: "USD",
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
};

export const ROTATION_ANGLES = {
  topRight: 26,
  topLeft: -25,
  bottomRight: -25,
  bottomLeft: 26,
};

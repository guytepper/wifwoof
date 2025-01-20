import { Format } from "@number-flow/react";

export const PRICE_FORMAT: Format = {
  style: "currency" as const,
  currency: "USD",
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
  currencyDisplay: "narrowSymbol",
};

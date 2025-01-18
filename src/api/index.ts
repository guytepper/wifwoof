import { CoinAPICurrentPrice } from "./type";

const endpoint =
  "https://rest.coinapi.io/v1/quotes/COINBASE_SPOT_WIF_USD/current";

export const fetchPrice = async () => {
  const response = await fetch(endpoint, {
    headers: {
      "x-coinapi-key": "704e53d3-1642-4e61-9a74-8c222ac412db",
    },
  });
  const data: CoinAPICurrentPrice = await response.json();
  console.log(data);
  return data;
};

export interface CoinAPICurrentPrice {
  symbol_id: string;
  time_exchange: string;
  time_coinapi: string;
  ask_price: number;
  ask_size: number;
  bid_price: number;
  bid_size: number;
  last_trade: LastTrade;
}

export interface LastTrade {
  time_exchange: string;
  time_coinapi: string;
  uuid: string;
  price: number;
  size: number;
  taker_side: string;
}

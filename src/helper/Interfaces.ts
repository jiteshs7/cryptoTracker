export type CoinProps = {
  price_change_percentage_24h: number;
  id: string;
  image: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
};

export interface UserProps {
  uid: string;
  displayName: string | null;
  email: string | undefined | null;
  photoURL: string | undefined | null;
  phoneNumber: string | undefined | null;
}

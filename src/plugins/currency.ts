import axios from "axios";

export const supportedCurrencies = [
  {
    label: "Bitcoin",
    value: "bitcoin",
    symbol: "btc",
    searchable: true,
  },
  {
    label: "Ethereum",
    value: "ethereum",
    symbol: "eth",
    searchable: true,
  },
  {
    label: "USD",
    value: "usd",
    symbol: "usd",
    searchable: false,
  },
] as const;

export const chartColors = [
  {
    borderColor: "#997fe6",
    backgroundColor: "#6a25b8",
  },
  {
    borderColor: "#e67f7f",
    backgroundColor: "#dd5555",
  },
  {
    borderColor: "#ffdf80",
    backgroundColor: "#ffd966",
  },
];

export type SupportedCurreciesIds = keyof {
  [T in typeof supportedCurrencies[number] as T['value']]: never;
};

export const searchableCurrencies = supportedCurrencies.filter(el => el.searchable !== false);

export const getCoinPrice = async (id: string) => {
  const res = await axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`);
  return res.data.market_data.current_price;
}

export const convertCurrency = async (idFrom: SupportedCurreciesIds, fromAmount: number, idTo: SupportedCurreciesIds) => {
  if (idTo === "usd") {
    const symbolTo = supportedCurrencies.find((el) => el.value === idTo)?.symbol as any;
    const fromPrice = await getCoinPrice(idFrom);
    return fromAmount * fromPrice[symbolTo];
  } else {
    const symbolFrom = supportedCurrencies.find((el) => el.value === idFrom)?.symbol as any;
    const toPrice = await getCoinPrice(idTo);
    return fromAmount / toPrice[symbolFrom];
  }
}

import { defineStore } from "pinia";
import { convertCurrency, SupportedCurreciesIds, supportedCurrencies } from "../plugins/currency";

export interface StateType {
  currencyBalance: {
    [currencyId: string]: number;
  }
}

export const useStore = defineStore('main', {
  state: () => {
    return {
      currencyBalance: {
        bitcoin: 231.93,
        ethereum: 23,
        usd: 543.12,
      }
    } as StateType;
  },
  actions: {
    addToBalance(id: string, value: number) {
      if (value) {
        this.currencyBalance[id] = Math.max(this.currencyBalance[id] + value, 0);
      }
    },
    async sumAllBalanceToUSD() {
      let result = 0;
      const promises: Promise<number>[] = [];
      for (const id in this.currencyBalance) {
        if (id === "usd") {
          result += this.currencyBalance[id];
        } else {
          promises.push(convertCurrency(id as SupportedCurreciesIds, this.currencyBalance[id], "usd"));
        }
      }
      await Promise.all(promises).then(res => res.forEach(el => result += el));
      return result;
    }
  }
});

const store = useStore();
supportedCurrencies.forEach((el) => {
  if (!store.currencyBalance[el.value]) {
    store.currencyBalance[el.value] = 0;
  }
});
import { Sale } from "../interfaces/Sale";
import React, { Dispatch, SetStateAction } from "react";

const inititalState: Sale = {
  client: "",
  articles: [],
  amount: [],
  price_dolar: [],
  price_bs: [],
  total_dolar: [],
  total_bs: [],
  all_total_dolar: 0,
  all_total_bs: 0,
};

export type ContextProps = {
  sale: Sale;
  setSale: (sale: Sale) => void;
};

export const SaleContext = React.createContext({
  sale: inititalState,
  setSale: (sale: Sale) => {},
});

export function useSale() {
  const context = React.useContext(SaleContext);

  if (!context) {
    throw new Error("error");
  }
  return context;
}

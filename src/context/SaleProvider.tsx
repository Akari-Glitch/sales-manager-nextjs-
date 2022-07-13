import { useState } from "react";
import { SaleContext, ContextProps } from "./SaleContext"
import { Sale } from "../interfaces/Sale";

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

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const SaleProvider = ({ children }: Props) => {
  const [sale, setSale] = useState(inititalState);

  return (
    <SaleContext.Provider value={{ sale, setSale } as ContextProps}>
      {children}
    </SaleContext.Provider >
  );
};

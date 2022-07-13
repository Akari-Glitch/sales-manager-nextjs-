import { useRouter } from "next/router";
import React from "react";

export interface Props {
  exchange_rate: Number;
}

function ExchangeRate({ exchange_rate }: Props) {
  const router = useRouter();

  return (
    <div>
      <label htmlFor="exchange_rate">Tasa del dolar</label>
      <input
        id="exchange_rate"
        onClick={() => router.push("/inventory/exchangeRate/change")}
        name="exchange_rate"
        placeholder="tasa de cambio"
        type="number"
        value={String(exchange_rate)}
        step="0.01"
        readOnly
      ></input>
    </div>
  );
}

export default ExchangeRate;

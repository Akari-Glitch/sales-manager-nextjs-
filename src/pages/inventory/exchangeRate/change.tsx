import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { StylesExchangeRate } from "../../../styles/inventory/StylesExchangeRate"

function Change() {
  const [exchange_rate, setExchange_rate] = useState(0);
  const router = useRouter();

  const updateExchange = async (exchange_rate: number) =>
    await fetch("http://localhost:3000/api/inventory/exchangeRate", {
      method: "PUT",
      body: JSON.stringify(exchange_rate),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setExchange_rate(Number(value));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateExchange(exchange_rate);
  };

  return (
    <StylesExchangeRate>
      <form onSubmit={handleSubmit}>
        <label className="title" htmlFor="exchange_rate">Tasa del dolar</label>
        <input
          id="exchange_rate"
          name="exchange_rate"
          placeholder="tasa de cambio"
          type="number"
          step="0.01"
          onChange={handleChange}
        ></input>
        <div className="button-container">
        <button onClick={() => router.push("/inventory")} type="submit">
          guardar
        </button>
        </div>
      </form>
    </StylesExchangeRate>
  );
}

export default Change;

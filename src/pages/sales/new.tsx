import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { SaleContext } from "../../context/SaleContext";
import { Article } from "../../interfaces/Article";
import { ExChangeRate } from "../../interfaces/ExchangeRate";
import { Sale } from "../../interfaces/Sale";
import Camps from "./camps";

export interface Props {
  inventory: Article[];
  exchange_rate: ExChangeRate[];
}

export default function New({ inventory, exchange_rate }: Props) {

  const router = useRouter();
  const { sale, setSale } = useContext(SaleContext);
  const [camps, setCamps] = useState([
    <Camps key={"key" + 1} idCamps={1} inventory={inventory} exchange_rate={exchange_rate}></Camps>,
  ]);
  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (name === "client") {
      sale.client = value;
    }
    setSale(sale)
  };

  const handleCamps = () => {
    sale.amount.push(0 as never)
    setCamps([...camps, <Camps key={"key" + camps.length + 1} idCamps={camps.length + 1} inventory={inventory} exchange_rate={exchange_rate}></Camps>]);

  };

  const createSale = async (sale: Sale) => {
    console.log(sale)
    await fetch("http://localhost:3000/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    });
  };

  const updateSale = async (id: string, sale: Sale) =>
    await fetch("http://localhost:3000/api/tasks/" + id, {
      method: "PUT",
      body: JSON.stringify(sale),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === "string") {
        updateSale(router.query.id, sale);
      } else {
        createSale(sale);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const loadSale = async (id: string) => {
    const res = await fetch("http://localhost:3000/api/sales/" + id);
    const sale: Sale = await res.json();
    setSale({
      client: sale.client,
      articles: sale.articles,
      amount: sale.amount,
      price_dolar: sale.price_dolar,
      price_bs: sale.price_bs,
      total_dolar: sale.total_dolar,
      total_bs: sale.total_bs,
      all_total_dolar: sale.all_total_dolar,
      all_total_bs: sale.all_total_bs,
    });
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadSale(router.query.id);
  }, [router.query]);

  return (
    <>
      <div className="container-form">
        <form onSubmit={handleSubmit}>
          <div className="container-client-name">
            <label htmlFor="name">Nombre:</label>
            <input
              id="client"
              name="client"
              type="text"
              onChange={handleChange}
              placeholder="Nombre de cliente"
            />
          </div>
          <table>
            <tbody id="camps-container">
              <tr className="container-names-columns">
                <td>
                  <h1>Articulo</h1>
                </td>
                <td>
                  <h1>Cantidad</h1>
                </td>
                <td>
                  <h1>Precio $</h1>
                </td>
                <td>
                  <h1>Precio Bs</h1>
                </td>
                <td>
                  <h1>Total $</h1>
                </td>
                <td>
                  <h1>Total Bs</h1>
                </td>
                <td></td>
              </tr>
              {camps}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <input
                    id="all_total_dolar"
                    name="all_total_dolar"
                    placeholder="monto total dolar"
                    type="number"
                    step="0.01"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    id="all_total_bs"
                    name="all_total_bs"
                    placeholder="monto total bs"
                    type="number"
                    step="0.01"
                    readOnly
                  />
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <button type="button" onClick={handleCamps}>
            add camp
          </button>
          <button onClick={() => router.push("/inventory")} type="submit">
            guardar
          </button>
        </form>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const resInventory = await fetch("http://localhost:3000/api/inventory");
  const inventory = await resInventory.json();
  const resExchange = await fetch(
    "http://localhost:3000/api/inventory/exchangeRate"
  );
  const exchange_rate = await resExchange.json();
  return {
    props: {
      inventory: inventory,
      exchange_rate: exchange_rate,
    },
  };
};
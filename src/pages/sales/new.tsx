import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { SaleContext } from "../../context/SaleContext";
import { Article } from "../../interfaces/Article";
import { ExChangeRate } from "../../interfaces/ExchangeRate";
import { Sale } from "../../interfaces/Sale";
import Camps from "../../components/sales/camps";
import { StylesSales } from "../../styles/sales/StylesSales"

export interface Props {
  inventory: Article[];
  exchange_rate: ExChangeRate[];
}

export default function New({ inventory, exchange_rate }: Props) {
  const router = useRouter();
  const { sale, setSale } = useContext(SaleContext);

  useEffect(() => {
    if (typeof router.query.id === "string") loadSale(router.query.id);
  }, [router.query]);

  let [camps, setCamps] = useState([
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
    await fetch("http://localhost:3000/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    });
  };

  const updateSale = async (id: string, sale: Sale) =>
    await fetch("http://localhost:3000/api/sales/" + id, {
      method: "PUT",
      body: JSON.stringify(sale),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleDelete = async () => {
    await fetch("http://localhost:3000/api/sales/" + router.query.id, {
      method: "DELETE",
    });
    router.push("/sales");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === "string") {
        updateSale(router.query.id, sale);
      } else {
        createSale(sale);
      }
      router.push("/sales");
    } catch (error) {
      console.log(error);
    }
  };
  const loadSale = async (id: string) => {
    const res = await fetch("http://localhost:3000/api/sales/" + id);
    const saleR: Sale = await res.json();
    sale.client = saleR.client;
    sale.all_total_dolar = saleR.all_total_dolar;
    sale.all_total_bs = saleR.all_total_bs;
    setSale(sale);

    const client = document.getElementById("client") as HTMLInputElement
    const allTotalDolar = document.getElementById("all_total_dolar") as HTMLInputElement
    const allTotalBs = document.getElementById("all_total_bs") as HTMLInputElement

    client.value = String(sale.client);
    allTotalDolar.value = String(sale.all_total_dolar);
    allTotalBs.value = String(sale.all_total_bs);

    for (let i = 1; i < saleR.articles.length; i++) {
      camps[i] = <Camps key={"key" + Number(i + 1)} idCamps={Number(i + 1)} inventory={inventory} exchange_rate={exchange_rate}></Camps>;
    }
    setCamps([...camps])
  };



  return (
    <StylesSales>
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
              autoComplete="off"
            />
          </div>
          <div className="table-container table-container-sales">
            <table>
              <tbody id="camps-container">
                <tr className="container-names-columns">
                  <td>
                    <span>Articulo</span>
                  </td>
                  <td>
                    <span>Cantidad</span>
                  </td>
                  <td>
                    <span>Precio $</span>
                  </td>
                  <td>
                    <span>Precio Bs</span>
                  </td>
                  <td>
                    <span>SubTotal $</span>
                  </td>
                  <td>
                    <span>SubTotal Bs</span>
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
          </div>
          <button type="button" onClick={handleCamps}>
            add camp
          </button>
          <button type="submit">
            guardar
          </button>
          {router.query.id ? (
            <button
              type="button"
              onClick={handleDelete}
            >
              delete
            </button>
          ) : null}
        </form>
      </div>
    </StylesSales>
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
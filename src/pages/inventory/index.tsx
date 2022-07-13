import { useRouter } from "next/router";
import { Article } from "../../interfaces/Article";
import { ExChangeRate } from "../../interfaces/ExchangeRate";
import ExchangeRate from "./exchangeRate";

export interface Props {
  inventory: Article[];
  exchange_rate: ExChangeRate[];
}
function Inventory({ inventory, exchange_rate }: Props) {
  const router = useRouter();
  //exchangeRate value
  const exrValue = exchange_rate[0].exchange_rate;
  return (
    <div>
      Inventory
      <ExchangeRate exchange_rate={exrValue}></ExchangeRate>
      <table>
        <tbody>
          <tr>
            <td>
              <h1>Articulo</h1>
            </td>
            <td>
              <h1>Precio Dolar</h1>
            </td>
            <td>
              <h1>Precio Bs</h1>
            </td>
          </tr>
          {inventory.map((article) => {
            return (
              <>
                <tr
                  key={"key" + String(article.id)}
                  id={String(article.id)}
                  onClick={() => router.push(`/inventory/edit/` + article.id)}
                >
                  <td>{article.article}</td>
                  <td>{article.price_dolar}</td>
                  <td>{article.price_bs}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => router.push("/inventory/new")}>add article</button>
    </div>
  );
}

export default Inventory;

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

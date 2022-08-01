import { ChangeEvent, MouseEvent, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SaleContext } from "../../context/SaleContext";
import { Article } from "../../interfaces/Article";
import { ExChangeRate } from "../../interfaces/ExchangeRate";
import { StylesCamps } from "../../styles/sales/StylesCamps"
import { Sale } from "../../interfaces/Sale";

interface Props {
  idCamps: number;
  inventory: Article[];
  exchange_rate: ExChangeRate[];
}

function Camps({ idCamps, inventory, exchange_rate }: Props) {
  const router = useRouter();
  const { sale, setSale } = useContext(SaleContext);

  const [showArticles, setShowArticles] = useState(false)
  let inventoryArticles: string[] = [];
  for (let i = 0; i < inventory.length; i++) {
    inventoryArticles.push(inventory[i].article)
  }
  let [filterArticles, setFilterArticles] = useState([...inventoryArticles])

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (name === "amount") {
      sale.amount[idCamps - 1] = Number(value)
    }

    if (name === "articles") {
      sale.articles[idCamps - 1] = value;
      filterArticles = [...inventoryArticles]
      for (let i = 0; i < filterArticles.length; i++) {

        if (!(filterArticles[i].indexOf(String(sale.articles[idCamps - 1])) > -1)) {
          filterArticles.splice(i, 1)
        }
      }
      setFilterArticles(filterArticles)
      priceDolar(value)
    }


    setSale(sale)
    changeValues();

  };


  function changeValues() {
    sale.price_bs[idCamps - 1] = Number((Number(exchange_rate[0].exchange_rate) * Number(sale.price_dolar[idCamps - 1])).toFixed(2));
    sale.total_dolar[idCamps - 1] = Number((Number(sale.price_dolar[idCamps - 1]) * Number(sale.amount[idCamps - 1])).toFixed(2));
    sale.total_bs[idCamps - 1] = Number((Number(sale.total_dolar[idCamps - 1]) * Number(sale.price_bs[idCamps - 1])).toFixed(2))
    sale.all_total_dolar = getAllTotalDolar();
    sale.all_total_bs = getAllTotalBs();

    const priceDolar = document.getElementById("priceDolar" + idCamps) as HTMLInputElement
    const priceBs = document.getElementById("priceBs" + idCamps) as HTMLInputElement
    const totalDolar = document.getElementById("totalDolar" + idCamps) as HTMLInputElement
    const totalBs = document.getElementById("totalBs" + idCamps) as HTMLInputElement
    const allTotalDolar = document.getElementById("all_total_dolar") as HTMLInputElement
    const allTotalBs = document.getElementById("all_total_bs") as HTMLInputElement

    priceDolar.value = String(sale.price_dolar[idCamps - 1]);
    priceBs.value = String(sale.price_bs[idCamps - 1]);
    totalDolar.value = String(sale.total_dolar[idCamps - 1]);
    totalBs.value = Number(sale.total_bs[idCamps - 1]) > 1 ? String(sale.total_bs[idCamps - 1]) : '0';
    allTotalDolar.value = String(sale.all_total_dolar);
    allTotalBs.value = String(sale.all_total_bs);
  }

  const deleteCamp = () => {
    const allTotalDolar = document.getElementById("all_total_dolar") as HTMLInputElement
    const allTotalBs = document.getElementById("all_total_bs") as HTMLInputElement
    const campsContainer: HTMLElement | null =
      document.getElementById("camps-container");
    const camps = document.getElementById("camps" + idCamps) as Node;
    campsContainer?.removeChild(camps);
    sale.amount[idCamps - 1] = null;
    sale.price_dolar[idCamps - 1] = null;
    sale.price_bs[idCamps - 1] = null;
    sale.total_dolar[idCamps - 1] = null;
    sale.total_bs[idCamps - 1] = null;
    sale.all_total_dolar = getAllTotalDolar();
    sale.all_total_bs = getAllTotalBs();
    allTotalDolar.value = String(sale.all_total_dolar);
    allTotalBs.value = String(sale.all_total_bs);
    setSale(sale)
    console.log(sale)

  };

  const getAllTotalDolar = (): Number => {
    let totalDolar: Number = 0;
    sale.total_dolar.map((item) => {
      totalDolar = Number(totalDolar) + Number(item);
    })
    return Number(totalDolar.toFixed(2));
  }

  const getAllTotalBs = (): Number => {

    let totalBs: Number = 0;
    sale.total_bs.map((item) => {
      totalBs = Number(totalBs) + Number(item);
    })
    return Number(totalBs.toFixed(2));
  }

  function priceDolar(value: string) {
    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].article === value) {
        sale.price_dolar[idCamps - 1] = inventory[i].price_dolar
      }
    }
  }
  const handleOption = (e: MouseEvent<HTMLLIElement>) => {
    const element = e.target as HTMLElement;
    const value: string = element.id;
    sale.articles[idCamps - 1] = value;
    const input = document.getElementById("article" + idCamps) as HTMLInputElement
    input.value = value;


    priceDolar(value)
    changeValues()
  }

  const handleBlur = () => {
    setTimeout(() => {
      setShowArticles(false)
    }, 100)
  }

  async function loadSaleValues(id: string) {
    const res = await fetch("http://localhost:3000/api/sales/" + id);
    const saleR: Sale = await res.json();
    sale.articles = saleR.articles;
    sale.amount = saleR.amount;
    sale.price_dolar = saleR.price_dolar;
    sale.price_bs = saleR.price_bs;
    sale.total_dolar = saleR.total_dolar;
    sale.total_bs = saleR.total_bs;
    sale.all_total_dolar = saleR.all_total_dolar
    sale.all_total_bs = saleR.all_total_bs,

      setSale(sale);

    const article = document.getElementById("article" + idCamps) as HTMLInputElement
    const amount = document.getElementById("amount" + idCamps) as HTMLInputElement
    const priceDolar = document.getElementById("priceDolar" + idCamps) as HTMLInputElement
    const priceBs = document.getElementById("priceBs" + idCamps) as HTMLInputElement
    const totalDolar = document.getElementById("totalDolar" + idCamps) as HTMLInputElement
    const totalBs = document.getElementById("totalBs" + idCamps) as HTMLInputElement
    const allTotalDolar = document.getElementById("all_total_dolar") as HTMLInputElement
    const allTotalBs = document.getElementById("all_total_bs") as HTMLInputElement

    article.value = !!sale.articles[idCamps - 1] ? String(sale.articles[idCamps - 1]) : ""
    amount.value = String(sale.amount[idCamps - 1])
    priceDolar.value = String(sale.price_dolar[idCamps - 1]);
    priceBs.value = String(sale.price_bs[idCamps - 1]);
    totalDolar.value = String(sale.total_dolar[idCamps - 1]);
    totalBs.value = Number(sale.total_bs[idCamps - 1]) > 1 ? String(sale.total_bs[idCamps - 1]) : '0';
    allTotalDolar.value = String(sale.all_total_dolar);
    allTotalBs.value = String(sale.all_total_bs);
  }
  useEffect(() => {

    if (typeof router.query.id === "string" && idCamps - 1 <= sale.articles.length) loadSaleValues(router.query.id)
  }, [typeof router.query.id === "string"]);
  return (

    <StylesCamps id={"camps" + idCamps}>

      <td className="article">
        <input
          id={"article" + idCamps}
          onFocus={() => setShowArticles(true)}
          onBlur={handleBlur}
          autoComplete="off"
          onChange={handleChange}
          type="text"
          name="articles"
          placeholder="Nombre de articulo"
        >

        </input>
        <ul className={showArticles ? "list" : "list-none"} id={"list" + idCamps}>
          {filterArticles.map((article) => {
            return (<li key={`id` + article + idCamps} id={article} onClick={handleOption}>{article}</li>)

          })}
        </ul>
      </td>
      <td>
        <input
          id={"amount" + idCamps}
          autoComplete="off"
          onChange={handleChange}
          type="number"
          name="amount"
          placeholder="Cantidad para llevar"
        />
      </td>
      <td>
        <input
          id={"priceDolar" + idCamps}
          autoComplete="off"
          type="number"
          step="0.01"
          name="price_dolar"
          placeholder="Precio en dolares"
          readOnly
        />
      </td>
      <td>
        <input
          id={"priceBs" + idCamps}
          autoComplete="off"
          type="number"
          step="0.01"
          name="price_bs"
          placeholder="Precio en bs"
          readOnly
        />
      </td>
      <td>
        <input
          id={"totalDolar" + idCamps}
          autoComplete="off"
          type="number"
          step="0.01"
          name="total_dolar"
          placeholder="Total dolares"
          readOnly
        />
      </td>
      <td>
        <input
          id={"totalBs" + idCamps}
          autoComplete="off"
          type="text"
          step="0.01"
          name="total_bs"
          placeholder="Total bs"
          readOnly
        />
      </td>
      <td>
        {idCamps > 1 ? (
          <button id={"delete" + idCamps} type="button" onClick={deleteCamp}>
            delete
          </button>
        ) : undefined}
      </td>
    </StylesCamps>
  );
}

export default Camps;


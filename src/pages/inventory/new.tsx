import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Article } from "../../interfaces/Article";
import { ExChangeRate } from "../../interfaces/ExchangeRate";

const inititalState: Article = {
  article: "",
  price_dolar: 0,
  price_bs: 0,
};

export interface Props {
  exchange_rate: ExChangeRate[];
}

function New({ exchange_rate }: Props) {
  const router = useRouter();
  let count: number = 1;
  const [article, setArticle] = useState<Article>(inititalState);
  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (name === "price_dolar") {
      article.price_bs = Number((Number(value) * exrValue).toFixed(2));
      setArticle(article);
    }
    if (name === "article") {
      value = value.toLowerCase()
    }

    setArticle({ ...article, [name]: value });
  };
  //exchange_rate value
  const exrValue = exchange_rate[0].exchange_rate;

  const createArticle = async (article: Article) => {
    await fetch("http://localhost:3000/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    });
  };
  const updateArticle = async (id: string, article: Article) =>
    await fetch("http://localhost:3000/api/inventory/" + id, {
      method: "PUT",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleDelete = async () => {
    await fetch("http://localhost:3000/api/inventory/" + router.query.id, {
      method: "DELETE",
    });
    router.push("/inventory");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (typeof router.query.id === "string") {
        updateArticle(router.query.id, article);
      } else {
        createArticle(article);
      }
      setArticle(inititalState);
      router.push("/inventory");
    } catch (error) {
      console.log(error);
    }
  };
  const loadArticle = async (id: string) => {
    const res = await fetch("http://localhost:3000/api/inventory/" + id);
    const article = await res.json();
    setArticle({
      article: article.article,
      price_dolar: article.price_dolar,
      price_bs: article.price_bs,
    });
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadArticle(router.query.id);
  }, [router.query]);

  return (
    <form onSubmit={handleSubmit}>
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
          <tr>
            <td>
              <input
                placeholder="articulo"
                name="article"
                onChange={handleChange}
                type="text"
                value={article.article}
                autoComplete="off"
              />
            </td>
            <td>
              <input
                placeholder="precio dolar"
                name="price_dolar"
                onChange={handleChange}
                value={article.price_dolar}
                step="0.01"
                type="number"
                autoComplete="off"
              />
            </td>
            <td>
              <input
                placeholder="precio bs"
                name="price_bs"
                onChange={handleChange}
                value={(article.price_dolar * exrValue).toFixed(2)}
                step="0.01"
                type="number"
                autoComplete="off"
                readOnly
              />
            </td>

            {router.query.id ? (
              <td>
                <button
                  type="button"
                  id={String(article.id)}
                  onClick={handleDelete}
                >
                  delete
                </button>
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
      <button onClick={() => router.push("/inventory")} type="submit">
        guardar
      </button>
    </form>
  );
}

export default New;

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/inventory/exchangeRate");
  const exchange_rate = await res.json();
  return {
    props: {
      exchange_rate: exchange_rate,
    },
  };
};

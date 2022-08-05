import React from 'react'
import { useRouter } from "next/router";
import { Sale } from '../../interfaces/Sale';
import Cookies from "universal-cookie";
import {StylesSales} from "../../styles/sales/StylesSales"
interface Props {
  sales: Sale[];
}

function Index({ sales }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove("loggin")
    cookies.set('logout', 'true', { path: '/' });
    router.push("/")

  }
  return (
    <StylesSales>
      <button onClick={handleLogout}>logout</button>
      <button onClick={() => router.push("/sales/new")}>Create one</button>
      <ul>
        {sales.map((sale, i) => {
          return (
            <li key={`sale${i}`} onClick={() => router.push(`/sales/edit/` + sale.id)}>
              <h1>{sale.client}</h1>
              <table>
                <tbody>
                  {sale.articles.map((article, index) => {
                    return (
                      <tr key={article + "key"}>
                        <td>{article}</td>
                        <td>{`${sale.amount[index]}`}</td>
                        <td>{`${sale.total_dolar[index]}$`}</td>
                      </tr>)
                  })}
                </tbody>
              </table>
              <h2>{`${sale.all_total_dolar}`}</h2>
            </li>
          )
        })}
      </ul>
    </StylesSales>
  )
}
export default Index

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/sales");
  const sales = await res.json()

  return {
    props: {
      sales: sales,
    },
  };
};
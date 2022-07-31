import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM sales WHERE id = $1";
        const values = [query.id];
        const result = await conn.query(text, values);

        if (result.rows.length === 0) {
          return res.status(404).json({ message: "Article not found " });
        }
        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    case "PUT":
      try {
        const {
          client,
          articles,
          amount,
          price_dolar,
          price_bs,
          total_dolar,
          total_bs,
          all_total_dolar,
          all_total_bs,
        } = body;
        const text =
          "UPDATE sales SET client = $1, articles = $2, amount = $3, price_dolar = $4, price_bs = $5, total_dolar = $6, total_bs = $7, all_total_dolar = $8, all_total_bs = $9 WHERE id = $10 RETURNING *";
        const values = [
          client,
          articles,
          amount,
          price_dolar,
          price_bs,
          total_dolar,
          total_bs,
          all_total_dolar,
          all_total_bs,
          query.id,
        ];
        const result = await conn.query(text, values);
        if (result.rows.length === 0) {
          return res.status(404).json({ message: "Article not Found" });
        }
        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
  }
};

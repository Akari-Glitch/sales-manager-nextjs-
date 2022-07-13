import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM sales";
        const response = await conn.query(query);
        return res.status(200).json(response.rows);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    case "POST":
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
        const query =
          "INSERT INTO sales(client, articles, amount, price_dolar, price_bs, total_dolar, total_bs, all_total_dolar, all_total_bs) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
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
        ];
        const response = await conn.query(query, values);
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json("invalid method");
  }
};

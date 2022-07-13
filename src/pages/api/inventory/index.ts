import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM inventory";
        const response = await conn.query(query);
        return res.status(200).json(response.rows);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    case "POST":
      try {
        const { article, price_dolar, price_bs } = body;
        const query =
          "INSERT INTO inventory(article, price_dolar, price_bs) VALUES ($1, $2, $3) RETURNING *";
        const values = [article, price_dolar, price_bs];
        const response = await conn.query(query, values);
        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    case "PUT":
      try {
        const { article, price_dolar, price_bs } = body;
        const text =
          "UPDATE inventory SET article = $1, price_dolar = $2, price_bs = $3 WHERE id = $4 RETURNING *";
        const values = [article, price_dolar, price_bs, id];
        const result = await conn.query(text, values);
        return res.json(result.rows[0]);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    case "DELETE":
      try {
        const text = "DELETE FROM inventory WHERE id = $1 RETURNING *";
        const values = [id];
        const result = await conn.query(text, values);

        if (result.rowCount === 0) {
          return res.status(404).json({ message: "article not Found" });
        }
        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    default:
      return res.status(400).json("invalid method");
  }
};

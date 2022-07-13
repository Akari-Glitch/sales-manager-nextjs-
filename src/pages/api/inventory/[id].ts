import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  switch (method) {
    case "GET":
      try {
        const text = "SELECT * FROM inventory WHERE id = $1";
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
        const { article, price_dolar, price_bs } = body;
        const text =
          "UPDATE inventory SET article = $1, price_dolar = $2, price_bs= $3 WHERE id = $4 RETURNING *";
        const values = [article, price_dolar, price_bs, query.id];
        const result = await conn.query(text, values);
        if (result.rows.length === 0) {
          return res.status(404).json({ message: "Article not Found" });
        }
        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    case "DELETE":
      try {
        const text = "DELETE FROM inventory WHERE id = $1 RETURNING *";
        const values = [query.id];
        const result = await conn.query(text, values);

        if (result.rowCount === 0) {
          return res.status(404).json({ message: "Article not Found" });
        }
        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    default:
      return res.status(400).json("invalid method");
  }
};

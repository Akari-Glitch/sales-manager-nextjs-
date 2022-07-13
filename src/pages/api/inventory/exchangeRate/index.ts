import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../../utils/database";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM dolar_to_bs";
        const response = await conn.query(query);
        return res.status(200).json(response.rows);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    case "PUT":
      try {
        const exchange_rate = body;
        const text =
          "UPDATE dolar_to_bs SET exchange_rate = $1 WHERE id = $2 RETURNING *";
        const values = [exchange_rate, 1];
        const result = await conn.query(text, values);
        return res.status(200).json(result.rows[0]);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json("invalid method");
  }
};

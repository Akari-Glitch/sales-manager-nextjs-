import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: "postgres",
    password: "akari123",
    host: "localhost",
    port: 5050,
    database: "salesdb",
  });
}

export { conn };

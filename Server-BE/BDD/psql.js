import phj  from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../Server-BE/miVar.env") });

const {Pool} = phj;

export const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  ssl: { rejectUnauthorized: false },
});

pool.connect().then(client => {
  console.log('Hola! Estamos al aire junto con PSQL');
  client.release();
}).catch( err => {
  console.error("sql no connected", err)
})

pool.on("connected ",() => {
  console.log("Try to go!")
})

pool.on("error",() => {
  console.error("Crytical Error: ", err)
})
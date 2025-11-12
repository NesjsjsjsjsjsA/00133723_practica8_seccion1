import phj from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve("../Server-BE/miVar.env") });

const { Pool } = phj;

export const pool = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  ssl: { rejectUnauthorized: false },
});

export const answerCall = async () => {
  return pool
    .connect()
    .then((client) => {
      exitosaConexion(client);
      return true;
    })
    .catch((err) => {
      fallodeConexion(err);
      return false;
    });
};

function exitosaConexion(client) {
  console.log("Hola nuevo yo! Estamos al aire junto con PSQL");
  client.release();
}

function fallodeConexion(err) {
  console.error("El show no puede continuar sin PSQL", err);
  client.release();
}

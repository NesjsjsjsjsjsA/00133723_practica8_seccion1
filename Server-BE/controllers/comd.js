import { pool } from "../BDD/psql.js";

import { hashing } from "../Tools/crypt.js";

export const displayHome = (req, resp) => {
  resp.send("Beinvendio al mundo PSQL!");
};

export const getUsers = async (req, resp) => {
  const results = await pool.query("SELECT * FROM users");
  resp.json(results.rows);
};

export const getUserByID = async (req, resp) => {
  const { id } = req.params;
  const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  resp.json(results.rows[0]);
};

export const createUser = async (req, resp) => {
  const { name, email, password } = req.body;
  const Hashpassword = await hashing(password);
  const results = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, Hashpassword]
  );
  resp.status(201).json(results.rows[0]);
};

export const updateUsers = async (req, resp) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const results = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  resp.json(results.rows[0]);
};

export const deleteUser = async (req, resp) => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
  resp.json({ message: "Eliminación completa" });
};

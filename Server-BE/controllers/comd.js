import { pool } from "../mod/psql.js";

const displayHome = (req, res) => {
  res.send("Hola!");
};

const getUsers = async (req, resp) => {
  const results = await pool.query("SELECT * FROM users");
  resp.json(results.rows);
};

const getUserByID = async (req, resp) => {
  const { id } = req.params;
  const results = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  resp.json(results.rows[0]);
};

const createUser = async (req, resp) => {
  const { name, email, password } = req.body;
  const results = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, password]
  );
  resp.status(201).json(results.rows[0]);
};

const updateUsers = async (req, resp) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const results = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  resp.json(results.rows[0]);
};

const deleteUser = async (req, resp) => {
  const {id} = req.params;
  await pool.query("DELETE FORM users WHERE id= $1", [id]);
  resp.json({message: "Completa eliminacion"})
};

export default {
  displayHome,
  getUsers,
  getUserByID,
  createUser,
  updateUsers,
  deleteUser,
};

import { pool } from "../BDD/psql.js";

export const getPassWord = async (email) => {
  const {rows} = await pool.query(
    "SELECT password FROM users WHERE email = $1",
    [email]
  );
  return rows.length > 0 ?rows[0].password: null;
};

export const getUserID = async (email) => {
  const {rows} = await pool.query("SELECT id FROM users WHERE email = $1", 
    [email]
  );
  return rows.length > 0 ? {message: rows[0].id} : {message: "None"}
};

export const getRealUser = async (email) => {
  const { rows } = await pool.query(
    "SELECT email FROM users WHERE email = $1",
    [email]
  );
  return rows.length > 0 ? rows[0].email : null;
};

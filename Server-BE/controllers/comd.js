import pool from "../mod/psql.js";

const getUsers = (req, resp) => {
  pool.query("SELECT * FROM users ORDER BY id ASC"),
    (error, results) => {
      if (error) {
        throw console.error();
      }
    };
};

const createUser = (req, resp) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1,$2) RETURNING * ",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }

      response.status(201).send("Se ha agredado una nueva cosa al mundillo");
    }
  );
};

const updateUsers = (req, resp) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send("Se ha actualizado pa");
    }
  );
};

const deleteUser = (req, resp) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FORM users WHERE id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send("Borrado con exito");
  });
};

export default {
    getUsers
}
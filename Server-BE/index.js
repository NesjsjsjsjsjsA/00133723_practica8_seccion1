import express from "express";
import bcrypt from "bcryptjs";
import bodyParser from "body-parser";
import cors from "cors";
import { pool } from "./mod/psql.js"; 


import { JWT_SECRET, PORT } from "./config/config.js";

import db from "./controllers/comd.js";
import { verifyToken, JOpw } from "./controllers/sends.js";

const app = express();

pool.connect().then(client => {
  console.log('Hola!');
  client.release();
}).catch( err => {
  console.error("sql no connected", err)
})

pool.on("connected ",() => {
  console.log("Log on")
})

pool.on("error",() => {
  console.error("Error", err)
})


app.use(bodyParser.json());
app.use(cors());

app.get("/",db.displayHome);

app.get("/users", db.getUsers);

app.get("/users/:id", db.getUserByID)

app.post("/users", db.createUser)

app.put("/users/:id", db.updateUsers)

app.delete("/users/:id", db.deleteUser)

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = { id: 1, email };

  //const userBD = users.find((u) => u.email === email);

  //if (!userBD) return res.status(404).json({ message: "User not found" });

  const isPasswordValidBD = await bcrypt.compare(
    password,
    user?.password || ""
  );

  if (!isPasswordValidBD)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = JOpw.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
});

app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected data accessed", user: req.user });
});


app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

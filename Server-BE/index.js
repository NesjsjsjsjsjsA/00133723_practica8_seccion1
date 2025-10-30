import express from "express";
//import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
//import jwt from "jsonwebtoken";

import { JWT_SECRET } from "./config/config.js";

import db from "./controllers/comd.js";
import {verifyToken, JOpw} from "./controllers/sends.js";

//export const JWT_SECRET = "your_jwt_secret";

const app = express();
const PORT = 5100;

app.use(bodyParser.json());
app.use(cors());

// Ruta de login (acceso libre)
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = { id: 1, email };

  // const user = users.find((u) => u.email === email);
  // if (!user) return res.status(404).json({ message: "User not found" });

  // const isPasswordValid = await bcrypt.compare(password, user?.password || "");
  // if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

  const isPasswordValid = true;

  const token = JOpw.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
});

// Ruta protegida (requiere token válido)
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected data accessed", user: req.user });
});

app.get("/users", db.getUsers);

//Apartado para determinar ...

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
console.log("JWT_SECRET =", process.env.JWT_SECRET)

);



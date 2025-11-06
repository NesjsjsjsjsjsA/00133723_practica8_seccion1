import express from "express";

import bodyParser from "body-parser";

import cors from "cors";

import routes from "./mod/conecction.js"

import { JWT_SECRET, PORT } from "./config/config.js";

import { Comphashing } from "./Tools/crypt.js";

import { verifyToken, JOpw } from "./controllers/sends.js";

import { getUserID, getRealUser } from "./controllers/comd.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.post("/signIn", async (req, res) => {

  const { email, password } = req.body;

  const truUser = await getRealUser(email);

  const Valpasword = await Comphashing(email, password);

  if(!truUser && !Valpasword) 
    return res.status(400).json({ message: "Invalid credentials" });

  const user = { id: await getUserID(email), email };

  const token = JOpw.sign({ 
    id: user.id }, 
    JWT_SECRET, 
    { expiresIn: "1h" });
  res.status(200).json({ token });
});

app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ 
    message: "Protected data accessed", 
    user: req.user 
  });
});

app.use("/",routes)

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

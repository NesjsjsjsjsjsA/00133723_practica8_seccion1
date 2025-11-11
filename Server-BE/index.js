import express from "express";

import bodyParser from "body-parser";

import cors from "cors";

import routes from "./middleware/conecction.js";

import { PORT } from "./Security/config.js";

import { Comphashing } from "./Tools/crypt.js";

import { signToken } from "./Security/sends.js";

import { getUserID, getRealUser } from "./controllers/auxcomd.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  const truUser = await getRealUser(email);

  const Valpasword = await Comphashing(email, password);

  if (!truUser && !Valpasword)
    return res.status(400).json({ message: "Invalid credentials" });

  const user = { id: await getUserID(email), email };

  const token = await signToken(user);

  res.status(200).json({ token: token, user: user });
});

app.use("/APIformation", routes);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

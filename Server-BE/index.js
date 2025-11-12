import express from "express";

import bodyParser from "body-parser";

import cors from "cors";

import routes from "./middleware/conecction.js";

import { PORT } from "./Security/config.js";

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use("/APIformation", routes);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

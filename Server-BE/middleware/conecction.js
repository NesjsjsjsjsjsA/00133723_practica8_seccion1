import express from "express";

import {
  displayHome,
  getUsers,
  getUserByID,
  createUser,
  updateUsers,
  deleteUser,
} from "../controllers/comd.js";

import { signIn } from "../controllers/signIn.js";

import { verifyToken } from "../Security/sends.js";

import { answerCall } from "../BDD/psql.js";

const router = express.Router();

answerCall().then((ok) =>{
  if (ok) {
    console.log("Conexión a la base de datos exitosa");
  } else {
    console.log("Error en la conexión a la base de datos");
  }
})

router.get("/", displayHome);

router.post("/signIn", signIn);

router.get("/users", verifyToken, getUsers);

router.get("/users/:id", verifyToken, getUserByID);

router.post("/users", verifyToken, createUser);

router.put("/users/:id", verifyToken, updateUsers);

router.delete("/users/:id", verifyToken, deleteUser);

export default router;

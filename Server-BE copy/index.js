import express from "express";
import jwt from "jsonwebtoken";
//import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 5100;
const JWT_SECRET = "your_jwt_secret"; // Usa una clave fuerte real en producción

app.use(bodyParser.json());
app.use(cors());

const users = []; // Base de datos temporal (solo para pruebas)

// Middleware para verificar token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Ruta de login (acceso libre)
app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // const user = users.find((u) => u.email === email);
  // if (!user) return res.status(404).json({ message: "User not found" });

  // const isPasswordValid = await bcrypt.compare(password, user?.password || "");
  // if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });
  const isPasswordValid = true;
  const user = { id: 1, email };

  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
});

// Ruta protegida (requiere token válido)
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected data accessed", user: req.user });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("../Server-BE/miVar.env") });

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT;

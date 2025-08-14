// src/config/db.js
import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Obtener la ruta absoluta de este archivo
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Cargar el archivo .env desde la raíz del proyecto
dotenv.config({ path: path.join(__dirname, "../../.env") });

const { Pool } = pg;

// Validar que las variables existen
if (
  !process.env.DB_USER ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_HOST ||
  !process.env.DB_DATABASE ||
  !process.env.DB_PORT
) {
  console.error("❌ Error: Faltan variables de entorno para la conexión a PostgreSQL.");
  console.log({
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_PASSWORD: process.env.DB_PASSWORD ? "(oculto)" : "(vacía o undefined)",
    DB_DATABASE: process.env.DB_DATABASE,
    DB_PORT: process.env.DB_PORT
  });
  process.exit(1);
}

// Crear el pool de conexión
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

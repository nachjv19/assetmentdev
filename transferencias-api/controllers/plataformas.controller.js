// controllers/plataformas.controller.js
import { pool } from "../src/db.js";

// Obtener todas las plataformas
export const getPlataformas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM plataformas ORDER BY id_plataforma");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener plataformas:", error);
    res.status(500).json({ error: "Error al obtener plataformas" });
  }
};

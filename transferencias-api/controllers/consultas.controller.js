// controllers/consultas.controller.js
import { pool } from "../src/db.js";

// 1. Total pagado por cada cliente
export const totalPagadoClientes = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT c.nombre, SUM(t.monto_pagado) AS total_pagado
      FROM clientes c
      JOIN transacciones t ON c.id_cliente = t.id_cliente
      GROUP BY c.nombre
      ORDER BY total_pagado DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Facturas pendientes con cliente y transacción
export const facturasPendientes = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT f.numero_factura, c.nombre, t.codigo_transaccion,
             f.monto_facturado, t.monto_pagado
      FROM facturas f
      JOIN transacciones t ON f.id_factura = t.id_factura
      JOIN clientes c ON t.id_cliente = c.id_cliente
      WHERE t.monto_pagado < f.monto_facturado
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Transacciones por plataforma
export const transaccionesPorPlataforma = async (req, res) => {
  try {
    const { nombre } = req.params;
    const { rows } = await pool.query(`
      SELECT t.codigo_transaccion, p.nombre AS plataforma,
             c.nombre AS cliente, f.numero_factura
      FROM transacciones t
      JOIN plataformas p ON t.id_plataforma = p.id_plataforma
      JOIN clientes c ON t.id_cliente = c.id_cliente
      JOIN facturas f ON t.id_factura = f.id_factura
      WHERE p.nombre ILIKE $1
    `, [nombre]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

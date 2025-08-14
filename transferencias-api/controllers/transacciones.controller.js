import { pool } from '../src/db.js';

// Obtener todas las transacciones
export const getTransacciones = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.id_transaccion,
             t.codigo_transaccion,
             t.fecha_hora,
             t.monto_transaccion,
             t.estado,
             t.tipo,
             t.monto_pagado,
             c.nombre AS cliente,
             p.nombre AS plataforma,
             f.numero_factura
      FROM transacciones t
      LEFT JOIN clientes c ON t.id_cliente = c.id_cliente
      LEFT JOIN plataformas p ON t.id_plataforma = p.id_plataforma
      LEFT JOIN facturas f ON t.id_factura = f.id_factura
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener transacciones" });
  }
};

// Obtener transacción por ID
export const getTransaccionById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM transacciones WHERE id_transaccion = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Transacción no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear nueva transacción
export const createTransaccion = async (req, res) => {
  try {
    const { codigo_transaccion, fecha_hora, monto_transaccion, id_cliente, id_factura, id_plataforma } = req.body;
    const result = await pool.query(
      `INSERT INTO transacciones (codigo_transaccion, fecha_hora, monto_transaccion, id_cliente, id_factura, id_plataforma)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [codigo_transaccion, fecha_hora, monto_transaccion, id_cliente, id_factura, id_plataforma]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar transacción
export const updateTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo_transaccion, fecha_hora, monto_transaccion, id_cliente, id_factura, id_plataforma } = req.body;
    const result = await pool.query(
      `UPDATE transacciones
       SET codigo_transaccion=$1, fecha_hora=$2, monto_transaccion=$3, id_cliente=$4, id_factura=$5, id_plataforma=$6
       WHERE id_transaccion=$7 RETURNING *`,
      [codigo_transaccion, fecha_hora, monto_transaccion, id_cliente, id_factura, id_plataforma, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Transacción no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar transacción
export const deleteTransaccion = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM transacciones WHERE id_transaccion=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Transacción no encontrada' });
    res.json({ message: 'Transacción eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

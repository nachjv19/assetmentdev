import { pool } from '../src/db.js';

// Obtener todas las facturas
export const getFacturas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM facturas ORDER BY id_factura');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener factura por ID
export const getFacturaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM facturas WHERE id_factura = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear nueva factura
export const createFactura = async (req, res) => {
  try {
    const { numero_factura, periodo_facturacion, monto_facturado } = req.body;
    const result = await pool.query(
      `INSERT INTO facturas (numero_factura, periodo_facturacion, monto_facturado)
       VALUES ($1, $2, $3) RETURNING *`,
      [numero_factura, periodo_facturacion, monto_facturado]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar factura
export const updateFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero_factura, periodo_facturacion, monto_facturado } = req.body;
    const result = await pool.query(
      `UPDATE facturas SET numero_factura=$1, periodo_facturacion=$2, monto_facturado=$3
       WHERE id_factura=$4 RETURNING *`,
      [numero_factura, periodo_facturacion, monto_facturado, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar factura
export const deleteFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM facturas WHERE id_factura=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json({ message: 'Factura eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

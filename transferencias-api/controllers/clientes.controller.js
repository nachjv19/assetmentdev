import { pool } from "../src/db.js";

export const getClientes = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM clientes ORDER BY id_cliente ASC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM clientes WHERE id_cliente = $1", [id]);
    if (!rows.length) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCliente = async (req, res) => {
  try {
    const { nombre, identificacion, direccion, telefono, email } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO clientes (nombre, identificacion, direccion, telefono, email) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [nombre, identificacion, direccion, telefono, email]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, identificacion, direccion, telefono, email } = req.body;
    const { rows } = await pool.query(
      "UPDATE clientes SET nombre=$1, identificacion=$2, direccion=$3, telefono=$4, email=$5 WHERE id_cliente=$6 RETURNING *",
      [nombre, identificacion, direccion, telefono, email, id]
    );
    if (!rows.length) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM clientes WHERE id_cliente=$1", [id]);
    if (!result.rowCount) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json({ message: "Cliente eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

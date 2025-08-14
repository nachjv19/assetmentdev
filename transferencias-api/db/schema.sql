-- Crear tablas normalizadas para transferencias NEQUI / DAVIPLATA
CREATE DATABASE transferencias


\c transferencias




-- 1. Clientes
CREATE TABLE clientes (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    identificacion BIGINT UNIQUE NOT NULL,
    direccion TEXT,
    telefono VARCHAR(30),
    email VARCHAR(150) UNIQUE
);


-- 2. Plataformas
CREATE TABLE plataformas (
    id_plataforma SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- 3. Facturas
CREATE TABLE facturas (
    id_factura SERIAL PRIMARY KEY,
    numero_factura VARCHAR(20) UNIQUE NOT NULL,
    periodo_facturacion TEXT NOT NULL,
    monto_facturado NUMERIC(12,2) NOT NULL
);

-- 4. Transacciones
CREATE TABLE transacciones (
    id_transaccion SERIAL PRIMARY KEY,
    codigo_transaccion VARCHAR(50) NOT NULL,
    fecha_hora TIMESTAMP NOT NULL,
    monto_transaccion NUMERIC(12,2) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    monto_pagado NUMERIC(12,2) NOT NULL,
    id_cliente INT  REFERENCES clientes(id_cliente) ON DELETE SET NULL,
    id_plataforma INT  REFERENCES plataformas(id_plataforma) ON DELETE SET NULL,
    id_factura INT REFERENCES facturas(id_factura) ON DELETE SET NULL
);
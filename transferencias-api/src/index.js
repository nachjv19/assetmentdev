// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import clientesRoutes from "../routes/clientes.routes.js";
import plataformasRoutes from "../routes/plataformas.routes.js";
import facturasRoutes from "../routes/facturas.routes.js";
import transaccionesRoutes from "../routes/transacciones.routes.js";
import consultasRoutes from "../routes/consultas.router.js"

dotenv.config();
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), views));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Rutas
app.use("/api/clientes", clientesRoutes);
app.use("/api/plataformas", plataformasRoutes);
app.use("/api/facturas", facturasRoutes);
app.use("/api/transacciones", transaccionesRoutes);
app.use("/api/consultas", consultasRoutes);

app.get("/clientes", (req, res) => {
  res.render("clientes");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

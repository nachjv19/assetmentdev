// routes/consultas.routes.js
import { Router } from "express";
import {
  totalPagadoClientes,
  facturasPendientes,
  transaccionesPorPlataforma
} from "../controllers/consultas.controller.js";

const router = Router();

router.get("/total-pagado-clientes", totalPagadoClientes);
router.get("/facturas-pendientes", facturasPendientes);
router.get("/transacciones-por-plataforma/:nombre", transaccionesPorPlataforma);

export default router;

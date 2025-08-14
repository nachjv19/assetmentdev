// routes/plataformas.routes.js
import { Router } from "express";
import { getPlataformas } from "../controllers/plataformas.controller.js";

const router = Router();

// Solo GET porque la tabla es fija
router.get("/", getPlataformas);

export default router;

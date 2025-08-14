import { Router } from 'express';
import { getFacturas, getFacturaById, createFactura, updateFactura, deleteFactura } from '../controllers/facturas.controller.js';

const router = Router();

router.get('/', getFacturas);
router.get('/:id', getFacturaById);
router.post('/', createFactura);
router.put('/:id', updateFactura);
router.delete('/:id', deleteFactura);

export default router;

import { Router } from 'express';
import { getTransacciones, getTransaccionById, createTransaccion, updateTransaccion, deleteTransaccion } from '../controllers/transacciones.controller.js';

const router = Router();

router.get('/', getTransacciones);
router.get('/:id', getTransaccionById);
router.post('/', createTransaccion);
router.put('/:id', updateTransaccion);
router.delete('/:id', deleteTransaccion);

export default router;

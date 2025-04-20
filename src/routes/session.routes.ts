// src/routes/session.routes.ts
import { Router } from 'express';
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession
} from '../controllers/session.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/', verifyToken, createSession);
router.get('/', verifyToken, getSessions);
router.get('/:id', verifyToken, getSessionById);
router.put('/:id', verifyToken, updateSession);
router.delete('/:id', verifyToken, deleteSession);

export default router;

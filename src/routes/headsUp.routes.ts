
// src/routes/headsUp.routes.ts
import { Router } from 'express';
import {
  submitHeadsUp,
  approveHeadsUp,
  listHeadsUps
} from '../controllers/headsUp.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/', verifyToken, submitHeadsUp);
router.put('/:id', verifyToken, approveHeadsUp);
router.get('/', verifyToken, listHeadsUps);

export default router;

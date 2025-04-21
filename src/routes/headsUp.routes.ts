
// src/routes/headsUp.routes.ts
import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { headsUpSchema } from '../utils/validationSchemas/headsUp.schema';
import {
  submitHeadsUp,
  approveHeadsUp,
  listHeadsUps
} from '../controllers/headsUp.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/', verifyToken, validateBody(headsUpSchema), submitHeadsUp);
router.put('/:id', verifyToken, approveHeadsUp);
router.get('/', verifyToken, listHeadsUps);

export default router;

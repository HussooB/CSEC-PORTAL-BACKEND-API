
// src/routes/admin.routes.ts
import { Router } from 'express';
import {
  listHeads,
  assignHead,
  createRole,
  setRules
} from '../controllers/admin.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';
const router = Router();

router.get('/heads', verifyToken, restrictTo('president'), listHeads);
router.post('/heads', verifyToken, restrictTo('president'), assignHead);
router.post('/roles', verifyToken, restrictTo('president'), createRole);
router.post('/rules', verifyToken, restrictTo('president'), setRules);

export default router;
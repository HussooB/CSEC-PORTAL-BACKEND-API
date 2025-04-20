// src/routes/division.routes.ts
import { Router } from 'express';
import {
  createDivision,
  getDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision
} from '../controllers/division.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';

const router = Router();

router.get('/', verifyToken, getDivisions);
router.post('/', verifyToken, restrictTo('president'), createDivision);
router.get('/:id', verifyToken, getDivisionById);
router.put('/:id', verifyToken, restrictTo('president'), updateDivision);
router.delete('/:id', verifyToken, restrictTo('president'), deleteDivision);

export default router;
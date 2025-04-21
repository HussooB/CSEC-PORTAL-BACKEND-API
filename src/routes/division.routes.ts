import { Router } from 'express';
import { 
  createDivision,
  getDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision
} from '../controllers/division.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo} from '../middleware/role.middleware';
import { checkOwnership } from '../middleware/checkOwnership';
import { validateBody } from '../middleware/validateBody';
import { divisionSchema } from '../utils/validationSchemas/division.schema';

const router = Router();

router.get('/', verifyToken, getDivisions);
router.post(
  '/',
  verifyToken,
  restrictTo('president'),
  validateBody(divisionSchema),
  createDivision
);
router.get('/:id', verifyToken, getDivisionById);
router.put(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  updateDivision
);
router.delete(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  deleteDivision
);

export default router;
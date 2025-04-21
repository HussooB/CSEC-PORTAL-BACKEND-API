import { Router } from 'express';
import { createGroup, getGroupsByDivision } from '../controllers/group.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';
import { checkOwnership } from '../middleware/checkOwnership';
import { validateBody } from '../middleware/validateBody';
import { groupSchema } from '../utils/validationSchemas/group.schema';

const router = Router();

router.post(
  '/',
  verifyToken,
  restrictTo('president', 'division_head'),
  validateBody(groupSchema),
  checkOwnership,
  createGroup
);
router.get('/:divisionId', verifyToken, getGroupsByDivision);

export default router;
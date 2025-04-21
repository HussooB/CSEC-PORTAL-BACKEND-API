import { Router } from 'express';
import { 
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession
} from '../controllers/session.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo, } from '../middleware/role.middleware';
import { checkOwnership } from '../middleware/checkOwnership';    
import { validateBody } from '../middleware/validateBody';
import { sessionSchema } from '../utils/validationSchemas/session.schema';

const router = Router();

router.post(
  '/',
  verifyToken,
  restrictTo('president', 'division_head'),
  validateBody(sessionSchema),
  createSession
);
router.get('/', verifyToken, getSessions);
router.get('/:id', verifyToken, getSessionById);
router.put(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  updateSession
);
router.delete(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  deleteSession
);

export default router;
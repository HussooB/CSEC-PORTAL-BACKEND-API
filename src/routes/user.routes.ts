import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { userRegistrationSchema } from '../utils/validationSchemas/user.schema';
import {
  createUserAsPresident,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';

const router = Router();

router.post(
  '/register',
  verifyToken,
  restrictTo('president', 'division_head'),
  validateBody(userRegistrationSchema), // Validate the request body
  createUserAsPresident
);
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, restrictTo('president', 'division_head'), updateUser);
router.delete('/:id', verifyToken, restrictTo('president'), deleteUser);

export default router;
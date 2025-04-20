// src/routes/user.routes.ts
import { Router } from 'express';
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

router.post('/register', verifyToken, restrictTo('president', 'division_head'), createUserAsPresident);
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, restrictTo('president'), deleteUser);

export default router;

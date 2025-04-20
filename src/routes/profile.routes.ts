import express from 'express';
import { getProfile, updateProfile } from '../controllers/profile.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/:id', verifyToken, getProfile);
router.put('/:id', verifyToken, updateProfile);

export default router;
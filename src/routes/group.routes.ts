// src/routes/group.routes.ts
import { Router } from 'express';
import { createGroup, getGroupsByDivision } from '../controllers/group.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/', verifyToken, createGroup);
router.get('/:divisionId', verifyToken, getGroupsByDivision);

export default router;

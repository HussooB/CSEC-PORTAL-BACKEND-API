
// src/routes/resource.routes.ts
import { Router } from 'express';
import { addResource, listResources, deleteResource } from '../controllers/resource.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/', verifyToken, addResource);
router.get('/', verifyToken, listResources);
router.delete('/:id', verifyToken, deleteResource);

export default router;

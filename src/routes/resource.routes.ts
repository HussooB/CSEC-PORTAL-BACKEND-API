
// src/routes/resource.routes.ts
import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { resourceSchema } from '../utils/validationSchemas/resource.schema';
import { addResource, listResources, deleteResource } from '../controllers/resource.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/', verifyToken, validateBody(resourceSchema), addResource);
router.get('/', verifyToken, listResources);
router.delete('/:id', verifyToken, deleteResource);

export default router;

import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { resourceSchema } from '../utils/validationSchemas/resource.schema';
import { addResource, listResources, deleteResource } from '../controllers/resource.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /resource:
 *   post:
 *     summary: Add a new resource
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Resource added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, validateBody(resourceSchema), addResource);

/**
 * @swagger
 * /resource:
 *   get:
 *     summary: Get all resources
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of resources
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, listResources);

/**
 * @swagger
 * /resource/{id}:
 *   delete:
 *     summary: Delete resource by ID
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Resource ID
 *     responses:
 *       200:
 *         description: Resource deleted successfully
 *       404:
 *         description: Resource not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', verifyToken, deleteResource);

export default router;
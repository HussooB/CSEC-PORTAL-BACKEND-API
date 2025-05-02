import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { resourceSchema } from '../utils/validationSchemas/resource.schema';
import { addResource, listResources, deleteResource, getResourcesByUser, getResourcesByDivision } from '../controllers/resource.controller';
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               link:
 *                 type: string
 *               division:
 *                 type: string
 *                 description: Division ID
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
 *     summary: Get resources
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: divisionId
 *         schema:
 *           type: string
 *         description: Division ID to filter resources
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID to filter resources
 *     responses:
 *       200:
 *         description: List of resources
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, listResources);

/**
 * @swagger
 * /resource/user/{userId}:
 *   get:
 *     summary: Get resources by user ID
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of resources uploaded by the user
 *       404:
 *         description: No resources found
 *       401:
 *         description: Unauthorized
 */
router.get('/user/:userId', verifyToken, getResourcesByUser);

/**
 * @swagger
 * /resource/division/{divisionId}:
 *   get:
 *     summary: Get resources by division ID
 *     tags: [Resources]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: divisionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Division ID
 *     responses:
 *       200:
 *         description: List of resources for the division
 *       404:
 *         description: No resources found
 *       401:
 *         description: Unauthorized
 */
router.get('/division/:divisionId', verifyToken, getResourcesByDivision);

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
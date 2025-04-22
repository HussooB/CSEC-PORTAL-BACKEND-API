import { Router } from 'express';
import { createGroup, getGroupsByDivision } from '../controllers/group.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';
import { checkOwnership } from '../middleware/checkOwnership';
import { validateBody } from '../middleware/validateBody';
import { groupSchema } from '../utils/validationSchemas/group.schema';

const router = Router();

/**
 * @swagger
 * /group:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Group'
 *     responses:
 *       201:
 *         description: Group created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  verifyToken,
  restrictTo('president', 'division_head'),
  validateBody(groupSchema),
  checkOwnership,
  createGroup
);

/**
 * @swagger
 * /group/{divisionId}:
 *   get:
 *     summary: Get groups by division ID
 *     tags: [Groups]
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
 *         description: List of groups
 *       404:
 *         description: Division not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:divisionId', verifyToken, getGroupsByDivision);

export default router;
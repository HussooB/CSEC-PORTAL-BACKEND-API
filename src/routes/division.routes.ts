import { Router } from 'express';
import {
  createDivision,
  getDivisions,
  getDivisionById,
  updateDivision,
  deleteDivision
} from '../controllers/division.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';
import { checkOwnership } from '../middleware/checkOwnership';
import { validateBody } from '../middleware/validateBody';
import { divisionSchema } from '../utils/validationSchemas/division.schema';

const router = Router();

/**
 * @swagger
 * /division:
 *   get:
 *     summary: Get all divisions
 *     tags: [Divisions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of divisions
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, getDivisions);

/**
 * @swagger
 * /division:
 *   post:
 *     summary: Create a new division
 *     tags: [Divisions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Division'
 *     responses:
 *       201:
 *         description: Division created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  verifyToken,
  restrictTo('president'),
  validateBody(divisionSchema),
  createDivision
);

/**
 * @swagger
 * /division/{id}:
 *   get:
 *     summary: Get division by ID
 *     tags: [Divisions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Division ID
 *     responses:
 *       200:
 *         description: Division details
 *       404:
 *         description: Division not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', verifyToken, getDivisionById);

/**
 * @swagger
 * /division/{id}:
 *   put:
 *     summary: Update division by ID
 *     tags: [Divisions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Division ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DivisionUpdate'
 *     responses:
 *       200:
 *         description: Division updated successfully
 *       404:
 *         description: Division not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  updateDivision
);

/**
 * @swagger
 * /division/{id}:
 *   delete:
 *     summary: Delete division by ID
 *     tags: [Divisions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Division ID
 *     responses:
 *       200:
 *         description: Division deleted successfully
 *       404:
 *         description: Division not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  deleteDivision
);

export default router;
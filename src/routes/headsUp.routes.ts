import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { headsUpSchema } from '../utils/validationSchemas/headsUp.schema';
import {
  submitHeadsUp,
  approveHeadsUp,
  listHeadsUps
} from '../controllers/headsUp.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /headsUp:
 *   post:
 *     summary: Submit a heads-up
 *     tags: [HeadsUp]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HeadsUp'
 *     responses:
 *       201:
 *         description: Heads-up submitted successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, validateBody(headsUpSchema), submitHeadsUp);

/**
 * @swagger
 * /headsUp/{id}:
 *   put:
 *     summary: Approve a heads-up
 *     tags: [HeadsUp]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Heads-up ID
 *     responses:
 *       200:
 *         description: Heads-up approved successfully
 *       404:
 *         description: Heads-up not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', verifyToken, approveHeadsUp);

/**
 * @swagger
 * /headsUp:
 *   get:
 *     summary: List all heads-ups
 *     tags: [HeadsUp]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of heads-ups
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, listHeadsUps);

export default router;
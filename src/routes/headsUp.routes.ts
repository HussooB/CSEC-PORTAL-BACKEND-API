import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { headsUpSchema } from '../utils/validationSchemas/headsUp.schema';
import {
  submitHeadsUp,
  approveHeadsUp,
  listHeadsUps,
  getHeadsUpsByUser, // Import the new controller
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
 *             type: object
 *             properties:
 *               profile:
 *                 type: string
 *                 description: User ID
 *               session:
 *                 type: string
 *                 description: Session ID
 *               type:
 *                 type: string
 *                 enum: [emergency, medical, other]
 *                 description: Type of heads-up
 *               reason:
 *                 type: string
 *                 description: Reason for the heads-up
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

/**
 * @swagger
 * /headsUp/user/{userId}:
 *   get:
 *     summary: Get heads-ups by user ID
 *     tags: [HeadsUp]
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
 *         description: List of heads-ups for the user
 *       404:
 *         description: No heads-ups found for the user
 *       401:
 *         description: Unauthorized
 */
router.get('/user/:userId', verifyToken, getHeadsUpsByUser);

export default router;
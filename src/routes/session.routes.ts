import { Router } from 'express';
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession
} from '../controllers/session.controller';
import { toggleCalendarVisibility } from '../controllers/session.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';
import { checkOwnership } from '../middleware/checkOwnership';
import { validateBody } from '../middleware/validateBody';
import { sessionSchema } from '../utils/validationSchemas/session.schema';

const router = Router();

/**
 * @swagger
 * /session:
 *   post:
 *     summary: Create a new session
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       201:
 *         description: Session created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  verifyToken,
  restrictTo('president', 'division_head'),
  validateBody(sessionSchema),
  createSession
);

/**
 * @swagger
 * /session:
 *   get:
 *     summary: Get all sessions
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of sessions
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, getSessions);


/**
 * @swagger
 * /session/{id}/toggle-calendar:
 *   patch:
 *     summary: Toggle session calendar visibility
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Calendar visibility toggled
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 showInCalendar:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Session not found
 */
router.patch(
  '/:id/toggle-calendar',
  verifyToken,
  restrictTo('president', 'division_head'),
  toggleCalendarVisibility
);


/**
 * @swagger
 * /session/{id}:
 *   get:
 *     summary: Get session by ID
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session details
 *       404:
 *         description: Session not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', verifyToken, getSessionById);

/**
 * @swagger
 * /session/{id}:
 *   put:
 *     summary: Update session by ID
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SessionUpdate'
 *     responses:
 *       200:
 *         description: Session updated successfully
 *       404:
 *         description: Session not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  updateSession
);

/**
 * @swagger
 * /session/{id}:
 *   delete:
 *     summary: Delete session by ID
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       404:
 *         description: Session not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  deleteSession
);

export default router;
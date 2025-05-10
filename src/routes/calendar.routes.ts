import { Router } from 'express';
import {
  createCalendar,
  getCalendars,
  getCalendarById,
  updateCalendar,
  deleteCalendar
} from '../controllers/calendar.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { restrictTo } from '../middleware/role.middleware';
import { checkOwnership } from '../middleware/checkOwnership';
import { validateBody } from '../middleware/validateBody';
import { calendarSchema } from '../utils/validationSchemas/calendar.schema';

const router = Router();

/**
 * @swagger
 * /calendar:
 *   post:
 *     summary: Create a new calendar event
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Calendar'
 *     responses:
 *       201:
 *         description: Calendar event created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/',
  verifyToken,
  restrictTo('president', 'division_head'),
  validateBody(calendarSchema),
  createCalendar
);

/**
 * @swagger
 * /calendar:
 *   get:
 *     summary: Get all calendar events
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of calendar events
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, getCalendars);

/**
 * @swagger
 * /calendar/{id}:
 *   get:
 *     summary: Get calendar event by ID
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Calendar event ID
 *     responses:
 *       200:
 *         description: Calendar event details
 *       404:
 *         description: Calendar event not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:id', verifyToken, getCalendarById);

/**
 * @swagger
 * /calendar/{id}:
 *   put:
 *     summary: Update calendar event by ID
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Calendar event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalendarUpdate'
 *     responses:
 *       200:
 *         description: Calendar event updated successfully
 *       404:
 *         description: Calendar event not found
 *       401:
 *         description: Unauthorized
 */
router.put(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  updateCalendar
);

/**
 * @swagger
 * /calendar/{id}:
 *   delete:
 *     summary: Delete calendar event by ID
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Calendar event ID
 *     responses:
 *       200:
 *         description: Calendar event deleted successfully
 *       404:
 *         description: Calendar event not found
 *       401:
 *         description: Unauthorized
 */
router.delete(
  '/:id',
  verifyToken,
  restrictTo('president', 'division_head'),
  checkOwnership,
  deleteCalendar
);

export default router;
import { Router } from 'express';
import {
  createCalendar,
  getCalendars,
  getCalendarById,
  getCalendarsByUser,
  updateCalendar,
  deleteCalendar,
  toggleCalendarVisibility
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
 * /calendar/user/{userId}/toggle-visibility/{eventId}:
 *   patch:
 *     summary: Toggle calendar event visibility for a specific user's event
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID who owns the calendar event
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Calendar event ID to toggle
 *     responses:
 *       200:
 *         description: Calendar visibility toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 showInCalendar:
 *                   type: boolean
 *                 eventId:
 *                   type: string
 *       404:
 *         description: Calendar event not found or doesn't belong to user
 *       401:
 *         description: Unauthorized
 */
router.patch(
  '/user/:userId/toggle-visibility/:eventId',
  verifyToken,
  toggleCalendarVisibility
);



/**
 * @swagger
 * /calendar/user/{userId}:
 *   get:
 *     summary: Get calendar events created by a specific user
 *     tags: [Calendar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to get calendar events for
 *     responses:
 *       200:
 *         description: List of calendar events
 *       404:
 *         description: No events found for this user
 *       401:
 *         description: Unauthorized
 */
router.get('/user/:userId', verifyToken, getCalendarsByUser);


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
  deleteCalendar
);

export default router;
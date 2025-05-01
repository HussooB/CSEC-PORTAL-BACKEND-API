import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { eventSchema } from '../utils/validationSchemas/event.schema';
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /event:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               division:
 *                 type: string
 *               visibility:
 *                 type: string
 *                 enum: [public, member]
 *               status:
 *                 type: string
 *                 enum: [planned, started, ended]
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/', verifyToken, validateBody(eventSchema), createEvent);

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of events
 *       401:
 *         description: Unauthorized
 */
router.get('/', verifyToken, getEvents);

/**
 * @swagger
 * /event/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               time:
 *                 type: string
 *               division:
 *                 type: string
 *               visibility:
 *                 type: string
 *                 enum: [public, member]
 *               status:
 *                 type: string
 *                 enum: [planned, started, ended]
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       401:
 *         description: Unauthorized
 */
router.put('/:id', verifyToken, validateBody(eventSchema), updateEvent);

/**
 * @swagger
 * /event/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       401:
 *         description: Unauthorized
 */
router.delete('/:id', verifyToken, deleteEvent);

export default router;
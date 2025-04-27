import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { attendanceSchema } from '../utils/validationSchemas/attendance.schema';
import {
  markAttendance,
  getAttendanceByProfile,
  getAttendanceBySession,
  getAttendanceStatus, // Import the new controller
} from '../controllers/attendance.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /attendance/mark:
 *   post:
 *     summary: Mark attendance for a session
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Attendance'
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/mark', verifyToken, validateBody(attendanceSchema), markAttendance);

/**
 * @swagger
 * /attendance/{profileId}:
 *   get:
 *     summary: Get attendance by profile ID
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Attendance details
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.get('/:profileId', verifyToken, getAttendanceByProfile);

/**
 * @swagger
 * /attendance/session/{sessionId}:
 *   get:
 *     summary: Get attendance by session ID
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Session ID
 *     responses:
 *       200:
 *         description: Attendance details
 *       404:
 *         description: Session not found
 *       401:
 *         description: Unauthorized
 */
router.get('/session/:sessionId', verifyToken, getAttendanceBySession);

/**
 * @swagger
 * /attendance/status/{profileId}:
 *   get:
 *     summary: Get attendance status by profile ID
 *     tags: [Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *     responses:
 *       200:
 *         description: Attendance status details
 *       404:
 *         description: Profile not found
 *       401:
 *         description: Unauthorized
 */
router.get('/status/:profileId', verifyToken, getAttendanceStatus);

export default router;
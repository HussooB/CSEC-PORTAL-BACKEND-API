
// src/routes/attendance.routes.ts
import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { attendanceSchema } from '../utils/validationSchemas/attendance.schema';
import {
  markAttendance,
  getAttendanceByProfile,
  getAttendanceBySession
} from '../controllers/attendance.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/mark', verifyToken,  validateBody(attendanceSchema), markAttendance);
router.get('/:profileId', verifyToken, getAttendanceByProfile);
router.get('/session/:sessionId', verifyToken, getAttendanceBySession);

export default router;

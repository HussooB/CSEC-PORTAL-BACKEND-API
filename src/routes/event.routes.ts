
// src/routes/event.routes.ts
import { Router } from 'express';
import { validateBody } from '../middleware/validateBody';
import { eventSchema } from '../utils/validationSchemas/event.schema';
import { createEvent, getEvents } from '../controllers/event.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/', verifyToken, validateBody(eventSchema), createEvent);
router.get('/', verifyToken, getEvents);

export default router;


// src/routes/event.routes.ts
import { Router } from 'express';
import { createEvent, getEvents } from '../controllers/event.controller';
import { verifyToken } from '../middleware/auth.middleware';
const router = Router();

router.post('/', verifyToken, createEvent);
router.get('/', verifyToken, getEvents);

export default router;

import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import profileRoutes from './routes/profile.routes';
import sessionRoutes from './routes/session.routes';
import resourceRoutes from './routes/resource.routes';
import headsUpRoutes from './routes/headsUp.routes';
import headRoutes from './routes/head.routes';
import groupRoutes from './routes/group.routes';
import eventRoutes from './routes/event.routes';
import divisionRoutes from './routes/division.routes';
import attendanceRoutes from './routes/attendance.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { scheduleSessionStatusUpdate } from './utils/sessionCron';
import { scheduleEventStatusUpdate } from './utils/eventCron';
import { updateLastSeen } from './middleware/updateLastSeen';
import { verifyToken } from './middleware/auth.middleware';

const app = express();
dotenv.config();
connectDB();

// Start the session status update cron job
scheduleSessionStatusUpdate();
scheduleEventStatusUpdate();

app.use(cors({
  origin: true, // or true for all origins
  credentials: true // important for cookies
}));

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieParser());

// Apply verifyToken and updateLastSeen only to protected routes
app.use('/api/user', verifyToken, updateLastSeen, userRoutes);
app.use('/api/profile', verifyToken, updateLastSeen, profileRoutes);
app.use('/api/session', verifyToken, updateLastSeen, sessionRoutes);
app.use('/api/resource', verifyToken, updateLastSeen, resourceRoutes);
app.use('/api/headsUp', verifyToken, updateLastSeen, headsUpRoutes);
app.use('/api/head', verifyToken, updateLastSeen, headRoutes);
app.use('/api/group', verifyToken, updateLastSeen, groupRoutes);
app.use('/api/event', verifyToken, updateLastSeen, eventRoutes);
app.use('/api/division', verifyToken, updateLastSeen, divisionRoutes);
app.use('/api/attendance', verifyToken, updateLastSeen, attendanceRoutes);
app.use('/api/admin', verifyToken, updateLastSeen, adminRoutes);

// Exclude auth routes from verifyToken
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler (should be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
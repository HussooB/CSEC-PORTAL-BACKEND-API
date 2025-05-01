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
import groupRoutes from './routes/group.routes';
import eventRoutes from './routes/event.routes';
import divisionRoutes from './routes/division.routes';
import attendanceRoutes from './routes/attendance.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { scheduleSessionStatusUpdate } from './utils/sessionCron'; // Import the cron job
import { scheduleEventStatusUpdate } from './utils/eventCron';

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

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Existing routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Add missing routes (keep these above errorHandler)
app.use('/api/session', sessionRoutes);
app.use('/api/resource', resourceRoutes);
app.use('/api/headsUp', headsUpRoutes);
app.use('/api/group', groupRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/division', divisionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);

// Error handler (should be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
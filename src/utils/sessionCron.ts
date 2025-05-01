import cron from 'node-cron';
import Session, { ISession } from '../models/session.model';

export const scheduleSessionStatusUpdate = () => {
  // Schedule the cron job to run every minute
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();

      // Update sessions to "started" if their startTime has been reached
      const sessionsToStart = await Session.find({
        status: 'planned',
        date: { $lte: now }, // Session date is today or earlier
        startTime: { $lte: now.toISOString().split('T')[1] }, // Start time has passed
      });

      for (const session of sessionsToStart as ISession[]) {
        session.status = 'started';
        await session.save();
        console.log(`Session "${session.title}" status updated to "started".`);
      }

      // Update sessions to "ended" if their endTime has been reached
      const sessionsToEnd = await Session.find({
        status: 'started',
        date: { $lte: now }, // Session date is today or earlier
        endTime: { $lte: now.toISOString().split('T')[1] }, // End time has passed
      });

      for (const session of sessionsToEnd as ISession[]) {
        session.status = 'ended';
        await session.save();
        console.log(`Session "${session.title}" status updated to "ended".`);
      }
    } catch (err) {
      console.error('Error updating session statuses:', err);
    }
  });

  console.log('Session status update cron job scheduled.');
};
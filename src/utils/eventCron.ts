import cron from 'node-cron';
import Event from '../models/event.model';

export const scheduleEventStatusUpdate = () => {
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();

      // Update events to "started" if their time has been reached
      const eventsToStart = await Event.find({
        status: 'planned',
        date: { $lte: now }, // Event date is today or earlier
        time: { $lte: now.toISOString().split('T')[1] }, // Event time has passed
      });

      for (const event of eventsToStart) {
        event.status = 'started';
        await event.save();
        console.log(`Event "${event.title}" status updated to "started".`);
      }

      // Update events to "ended" if their time has passed
      const eventsToEnd = await Event.find({
        status: 'started',
        date: { $lte: now }, // Event date is today or earlier
        time: { $lte: now.toISOString().split('T')[1] }, // Event time has passed
      });

      for (const event of eventsToEnd) {
        event.status = 'ended';
        await event.save();
        console.log(`Event "${event.title}" status updated to "ended".`);
      }
    } catch (err) {
      console.error('Error updating event statuses:', err);
    }
  });

  console.log('Event status update cron job scheduled.');
};
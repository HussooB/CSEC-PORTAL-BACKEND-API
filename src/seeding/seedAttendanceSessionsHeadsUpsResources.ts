import mongoose from 'mongoose';
import Attendance from '../models/attendance.model';
import Session, { ISession } from '../models/session.model';
import HeadsUp from '../models/headsUp.model';
import Resource from '../models/resource.model';
import Event from '../models/event.model'; // Import Event model
import User from '../models/user.model';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const seedAttendanceSessionsHeadsUpsResources = async () => {
  try {
    // Division and Group IDs provided
    const divisionId = new mongoose.Types.ObjectId('680a9a2c9e86262d7c618bd4');
    const groupId = new mongoose.Types.ObjectId('680a9a319e86262d7c618beb');

    // Fetch the user for attendance and heads-up
    const user = await User.findOne({ email: 'mohsad.7676@gmail.com' });
    if (!user) {
      console.log('User not found. Please seed users first.');
      return;
    }

    // 1. Seed Sessions
    const sessions = [
      {
        title: 'Session 1',
        date: new Date('2025-05-01T10:00:00Z'),
        division: divisionId,
        groups: [groupId],
        startTime: '10:00',
        endTime: '12:00',
        status: 'planned',
      },
      {
        title: 'Session 2',
        date: new Date('2025-05-02T10:00:00Z'),
        division: divisionId,
        groups: [groupId],
        startTime: '14:00',
        endTime: '16:00',
        status: 'planned',
      },
      {
        title: 'Session 3',
        date: new Date('2025-05-03T09:00:00Z'),
        division: divisionId,
        groups: [groupId],
        startTime: '09:00',
        endTime: '11:00',
        status: 'planned',
      },
    ];

    for (const session of sessions) {
      const existingSession = await Session.findOne({ title: session.title });
      if (!existingSession) {
        await Session.create(session);
        console.log(`Session ${session.title} created.`);
      } else {
        console.log(`Session ${session.title} already exists.`);
      }
    }

    // Fetch the created sessions
    const createdSessions: ISession[] = await Session.find({ division: divisionId, groups: groupId });

    // 2. Seed Attendance
    const attendanceRecords = [
      { profile: user._id, sessionDate: createdSessions[0].date, status: 'present' },
      { profile: user._id, sessionDate: createdSessions[0].date, status: 'present' },
      { profile: user._id, sessionDate: createdSessions[0].date, status: 'absent' },
      { profile: user._id, sessionDate: createdSessions[1].date, status: 'present' },
      { profile: user._id, sessionDate: createdSessions[1].date, status: 'absent' },
      { profile: user._id, sessionDate: createdSessions[1].date, status: 'present' },
      { profile: user._id, sessionDate: createdSessions[2].date, status: 'present' },
      { profile: user._id, sessionDate: createdSessions[2].date, status: 'absent' },
      { profile: user._id, sessionDate: createdSessions[2].date, status: 'absent' },
      { profile: user._id, sessionDate: createdSessions[2].date, status: 'present' },
    ];

    for (const record of attendanceRecords) {
      const existingAttendance = await Attendance.findOne({
        profile: record.profile,
        sessionDate: record.sessionDate,
      });
      if (!existingAttendance) {
        await Attendance.create(record);
        console.log(`Attendance for session on ${record.sessionDate} created.`);
      } else {
        console.log(`Attendance for session on ${record.sessionDate} already exists.`);
      }
    }

    // 3. Seed Heads-Ups
    const headsUps = [
      {
        profile: user._id,
        session: createdSessions[1]._id, // Link to the second session
        reason: 'Medical appointment',
        status: 'pending', // Valid status
      },
      {
        profile: user._id,
        session: createdSessions[2]._id, // Link to the third session
        reason: 'Family emergency',
        status: 'approved', // Valid status
      },
    ];

    for (const headsUp of headsUps) {
      const existingHeadsUp = await HeadsUp.findOne({
        profile: headsUp.profile,
        session: headsUp.session,
      });
      if (!existingHeadsUp) {
        await HeadsUp.create(headsUp);
        console.log(`Heads-up for session ${headsUp.session} created.`);
      } else {
        console.log(`Heads-up for session ${headsUp.session} already exists.`);
      }
    }

    // 4. Seed Resources
    const resources = [
      {
        name: 'Resource 1',
        link: 'https://example.com/resource1',
        uploaded_by: user._id,
      },
      {
        name: 'Resource 2',
        link: 'https://example.com/resource2',
        uploaded_by: user._id,
      },
      {
        name: 'Resource 3',
        link: 'https://example.com/resource3',
        uploaded_by: user._id,
      },
    ];

    for (const resource of resources) {
      const existingResource = await Resource.findOne({ name: resource.name });
      if (!existingResource) {
        await Resource.create(resource);
        console.log(`Resource ${resource.name} created.`);
      } else {
        console.log(`Resource ${resource.name} already exists.`);
      }
    }

    // 5. Seed Events
    const events = [
      {
        title: 'Event 1',
        description: 'This is the first event.',
        date: new Date('2025-05-05'),
        time: '10:00',
        division: divisionId,
        visibility: 'public',
        status: 'planned',
      },
      {
        title: 'Event 2',
        description: 'This is the second event.',
        date: new Date('2025-05-06'),
        time: '14:00',
        division: divisionId,
        visibility: 'member',
        status: 'planned',
      },
    ];

    for (const event of events) {
      const existingEvent = await Event.findOne({ title: event.title });
      if (!existingEvent) {
        await Event.create(event);
        console.log(`Event ${event.title} created.`);
      } else {
        console.log(`Event ${event.title} already exists.`);
      }
    }

    console.log('Seeding for attendance, sessions, heads-ups, resources, and events completed.');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
};
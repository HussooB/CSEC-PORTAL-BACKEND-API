import mongoose from 'mongoose';
import Attendance from '../models/attendance.model';
import Session, { ISession } from '../models/session.model';
import HeadsUp from '../models/headsUp.model';
import Resource from '../models/resource.model';
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
      { profile: user._id, sessionDate: createdSessions[1].date, status: 'absent' },
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
        status: 'pending',
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

    console.log('Seeding for attendance, sessions, heads-ups, and resources completed.');
  } catch (err) {
    console.error('Seeding failed:', err);
  }
};
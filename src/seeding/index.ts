import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedUsers } from './seedUsers';

// Load environment variables
dotenv.config();

const startSeeding = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in the environment variables.');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Seed attendance, sessions, heads-ups, and resources
    await seedUsers();
    console.log('Attendance, sessions, heads-ups, and resources seeded.');

    console.log('Seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

startSeeding();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedRoles } from './seedRoles';
import { seedUsers } from './seedUsers';
import { seedDivisions } from './seedDivisions';
import { seedGroups } from './seedGroups';
import { seedRules } from './seedRules';
import { seedProfiles } from './seedProfiles';

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

    await seedRoles();
    console.log('Roles seeded.');

    await seedUsers();
    console.log('Users seeded.');

    await seedDivisions();
    console.log('Divisions seeded.');

    await seedGroups();
    console.log('Groups seeded.');

    await seedRules();
    console.log('Rules seeded.');

    await seedProfiles();
    console.log('Profiles seeded.');

    console.log('Seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

startSeeding();
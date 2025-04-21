import mongoose from 'mongoose';
import { seedRoles } from './seedRoles';
import { seedUsers } from './seedUsers';
import { seedDivisions } from './seedDivisions';
import { seedGroups } from './seedGroups';
import { seedRules } from './seedRules';
import { seedProfiles } from './seedProfiles';

const startSeeding = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to MongoDB.');

    await seedRoles();
    await seedUsers();
    await seedDivisions();
    await seedGroups();
    await seedRules();
    await seedProfiles();

    console.log('Seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

startSeeding();
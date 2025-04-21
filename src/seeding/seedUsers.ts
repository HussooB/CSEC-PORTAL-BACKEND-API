import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  const superAdmin = {
    email: 'superadmin@example.com',
    passwordHash: await bcrypt.hash('superadmin123', 10),
    role: 'super_admin',
  };

  const existingUser = await User.findOne({ email: superAdmin.email });
  if (!existingUser) {
    await User.create(superAdmin);
    console.log('Super admin user created.');
  } else {
    console.log('Super admin user already exists.');
  }
};
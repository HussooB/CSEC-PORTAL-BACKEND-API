import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  const users = [
    {
      email: 'kiyakebe799@gmail.com', // President
      passwordHash: await bcrypt.hash('12345678', 10),
      role: 'president',
    },
    {
      email: 'hussein.beshir100@gmail.com', // Division Head
      passwordHash: await bcrypt.hash('12345678', 10),
      role: 'division_head',
    },
    {
      email: 'mohsad.7676@gmail.com', // Regular User
      passwordHash: await bcrypt.hash('12345678', 10),
      role: 'member',
    },
  ];

  for (const user of users) {
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      await User.create(user);
      console.log(`User ${user.email} created.`);
    } else {
      console.log(`User ${user.email} already exists.`);
    }
  }
};
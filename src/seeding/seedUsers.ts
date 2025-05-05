import User from '../models/user.model';
import bcrypt from 'bcryptjs';

export const seedUsers = async () => {
  const users = [
    
    {
      email: 'kiyakebe799@gmail.com', // Regular User
      passwordHash: await bcrypt.hash('12345678', 10),
      divisionId: "680a9a2b9e86262d7c618bd1",
      groupId: "680a9a2f9e86262d7c618bde",
      role: 'president',
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
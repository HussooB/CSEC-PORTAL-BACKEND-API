import Profile from '../models/profile.model';
import User from '../models/user.model';
import Division from '../models/division.model';

export const seedProfiles = async () => {
  const users = [
    { email: 'kiyakebe799@gmail.com', division: 'CPD' }, // President
    { email: 'hussein.beshir100@gmail.com', division: 'DEV' }, // Division Head
    { email: 'mohsad.7676@gmail.com', division: 'CYBER' }, // Regular User
  ];

  for (const userData of users) {
    const user = await User.findOne({ email: userData.email });
    const division = await Division.findOne({ name: userData.division });

    if (!user || !division) {
      console.log(`User or Division not found for ${userData.email}.`);
      continue;
    }

    const profile = {
      user: user._id,
      division: division._id,
      joining_date: new Date(),
      status: 'active',
    };

    const existingProfile = await Profile.findOne({ user: user._id });
    if (!existingProfile) {
      await Profile.create(profile);
      console.log(`Profile created for ${userData.email}.`);
    } else {
      console.log(`Profile for ${userData.email} already exists.`);
    }
  }
};
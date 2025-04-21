import Profile from '../models/profile.model';
import User from '../models/user.model';
import Division from '../models/division.model';

export const seedProfiles = async () => {
  const user = await User.findOne({ email: 'superadmin@example.com' });
  const division = await Division.findOne({ name: 'Engineering' });

  if (!user || !division) {
    console.log('User or Division not found. Please seed users and divisions first.');
    return;
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
    console.log('Profile created for super admin.');
  } else {
    console.log('Profile for super admin already exists.');
  }
};
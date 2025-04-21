import Group from '../models/group.model';
import Division from '../models/division.model';

export const seedGroups = async () => {
  const engineeringDivision = await Division.findOne({ name: 'Engineering' });
  if (!engineeringDivision) {
    console.log('Engineering division not found. Please seed divisions first.');
    return;
  }

  const groups = [
    { name: 'Frontend Team', division: engineeringDivision._id },
    { name: 'Backend Team', division: engineeringDivision._id },
  ];

  for (const group of groups) {
    const existingGroup = await Group.findOne({ name: group.name });
    if (!existingGroup) {
      await Group.create(group);
      console.log(`Group ${group.name} created.`);
    } else {
      console.log(`Group ${group.name} already exists.`);
    }
  }
};
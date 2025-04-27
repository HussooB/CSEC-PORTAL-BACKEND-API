import Group from '../models/group.model';
import Division from '../models/division.model';

export const seedGroups = async () => {
  const divisions = ['CPD', 'DEV', 'CYBER', 'DATA SCIENCE'];
  const groupNames = ['G1', 'G2', 'G3', 'G4'];

  for (const divisionName of divisions) {
    const division = await Division.findOne({ name: divisionName });
    if (!division) {
      console.log(`Division ${divisionName} not found. Please seed divisions first.`);
      continue;
    }

    for (const groupName of groupNames) {
      const existingGroup = await Group.findOne({ name: groupName, division: division._id });
      if (!existingGroup) {
        await Group.create({ name: groupName, division: division._id });
        console.log(`Group ${groupName} created under division ${divisionName}.`);
      } else {
        console.log(`Group ${groupName} already exists under division ${divisionName}.`);
      }
    }
  }
};
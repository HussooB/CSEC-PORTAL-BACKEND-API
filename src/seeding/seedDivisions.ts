import Division from '../models/division.model';

export const seedDivisions = async () => {
  const divisions = [
    { name: 'Engineering', year_of_establishment: 2000 },
    { name: 'Marketing', year_of_establishment: 2010 },
  ];

  for (const division of divisions) {
    const existingDivision = await Division.findOne({ name: division.name });
    if (!existingDivision) {
      await Division.create(division);
      console.log(`Division ${division.name} created.`);
    } else {
      console.log(`Division ${division.name} already exists.`);
    }
  }
};
import Division from '../models/division.model';

export const seedDivisions = async () => {
  const divisions = [
    { name: 'CPD', year_of_establishment: 2015 },
    { name: 'DEV', year_of_establishment: 2010 },
    { name: 'CYBER', year_of_establishment: 2018 },
    { name: 'DATA SCIENCE', year_of_establishment: 2020 },
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
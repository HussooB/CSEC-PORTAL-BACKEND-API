import Rule from '../models/rule.model';

export const seedRules = async () => {
  const defaultRule = {
    maxAbsences: 5,
    warningAfter: 3,
    suspendAfter: 4,
    fireAfter: 5,
    permanentRestriction: false,
  };

  const existingRule = await Rule.findOne(defaultRule);
  if (!existingRule) {
    await Rule.create(defaultRule);
    console.log('Default rule created.');
  } else {
    console.log('Default rule already exists.');
  }
};
import * as yup from 'yup';

export const sessionSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(), // Add description field
  division: yup.string().required(),
  groups: yup.array().of(yup.string().required()).required(), // Ensure group is an array of strings
  date: yup.date().required(), // Replace startMonth and endMonth with date
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  status: yup.string().oneOf(['planned', 'started', 'ended']).required(), // Add status validation
});
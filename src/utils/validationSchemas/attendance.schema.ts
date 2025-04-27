import * as yup from 'yup';

export const attendanceSchema = yup.object({
  profile: yup.string().required(),
  sessionDate: yup.date().required(), // Match the Mongoose schema
  status: yup.string().oneOf(['present', 'absent', 'excused']).required(),
});
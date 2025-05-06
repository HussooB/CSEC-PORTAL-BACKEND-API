import * as yup from 'yup';

export const attendanceSchema = yup.object({
  profile: yup.string().required(), // Validate profile ID
  session: yup.string().required(), // Validate session ID
  sessionDate: yup.date().required(), // Validate session date
  status: yup.string().oneOf(['present', 'absent', 'excused']).required(), // Validate status
});
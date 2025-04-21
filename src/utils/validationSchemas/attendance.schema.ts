import * as yup from 'yup';

export const attendanceSchema = yup.object({
  profile: yup.string().required(),
  session: yup.string().required(),
  status: yup.string().oneOf(['present', 'absent', 'excused']).required()
});
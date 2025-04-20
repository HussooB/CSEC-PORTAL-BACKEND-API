// user.schema.ts
import * as yup from 'yup';

export const userRegistrationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  role: yup.string().oneOf(['member', 'division_head', 'president']).optional(),
});

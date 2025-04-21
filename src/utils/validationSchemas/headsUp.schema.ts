// headsUp.schema.ts
import * as yup from 'yup';
export const headsUpSchema = yup.object({
  reason: yup.string().required().min(10),
  session: yup.string().required()
});
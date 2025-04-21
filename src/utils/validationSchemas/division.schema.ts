// division.schema.ts
import * as yup from 'yup';
export const divisionSchema = yup.object({
  name: yup.string().required(),
  head: yup.string().optional(),
  members: yup.array().of(yup.string()).optional()
});
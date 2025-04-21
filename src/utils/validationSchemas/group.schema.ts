// filepath: src/utils/validationSchemas/group.schema.ts
import * as yup from 'yup';

export const groupSchema = yup.object({
  name: yup.string().required(),
  division: yup.string().required(),
});
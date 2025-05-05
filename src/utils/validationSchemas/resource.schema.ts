import * as yup from 'yup';

export const resourceSchema = yup.object({
  name: yup.string().required(),
  link: yup.string().url().required(),
  division: yup.string().nullable(), // Make division optional
});
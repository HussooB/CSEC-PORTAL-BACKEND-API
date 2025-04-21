import * as yup from 'yup';

export const eventSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().optional(),
  date: yup.date().required(),
  time: yup.string().required(),
  location: yup.string().optional()
});
import * as yup from 'yup';

export const resourceSchema = yup.object({
  name: yup.string().required('Resource name is required'),
  link: yup.string().required('Resource link is required').url('Must be a valid URL'),
  division: yup.string().optional()
});
// headsUp.schema.ts
import * as yup from 'yup';

export const headsUpSchema = yup.object().shape({
  profile: yup.string().required('Profile (user ID) is required'),
  session: yup.string().required('Session ID is required'),
  type: yup
    .string()
    .oneOf(['emergency', 'medical case', 'family issue'], 'Invalid type')
    .required('Type is required'),
  reason: yup.string().required('Reason is required'),
});
import * as yup from 'yup';

export const userRegistrationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  divisionId: yup.string().required('Division ID is required'),
  groupId: yup.string().required('Group ID is required'),
});
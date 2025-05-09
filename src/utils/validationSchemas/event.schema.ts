import * as yup from 'yup';

export const eventSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().optional(),
  date: yup.date().required('Date is required'),
  time: yup.string().required('Time is required'),
  visibility: yup
    .string()
    .oneOf(['public', 'member'], 'Visibility must be either "public" or "member"')
    .default('public'),
  status: yup
    .string()
    .oneOf(['planned', 'started', 'ended'], 'Status must be either "planned", "started", or "ended"')
    .default('planned'),
});
import * as yup from 'yup';

export const calendarSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  division: yup.string().required('Division is required'),
  groups: yup.array().of(yup.string()),
  date: yup.date().required('Date is required'),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string().required('End time is required'),
  status: yup
    .string()
    .oneOf(['planned', 'started', 'ended'], "Status must be either 'planned', 'started', or 'ended'")
    .default('planned')
});
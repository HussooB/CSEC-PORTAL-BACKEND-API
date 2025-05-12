import * as yup from 'yup';

export const calendarSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  date: yup.date().required('Date is required'),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string().required('End time is required'),
  status: yup
    .string()
    .oneOf(['planned', 'started', 'ended'], "Status must be 'planned', 'started', or 'ended'")
    .default('planned'),
  showInCalendar: yup.boolean().default(true) // Add this line
});
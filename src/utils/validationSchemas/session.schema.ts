// filepath: src/utils/validationSchemas/session.schema.ts
import * as yup from 'yup';

export const sessionSchema = yup.object({
  title: yup.string().required(),
  division: yup.string().required(),
  group: yup.string().required(),
  startMonth: yup.date().required(),
  endMonth: yup.date().required(),
  days: yup.array().of(yup.string().oneOf(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])).required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
});
import * as yup from 'yup';

export const personalInfoSchema = yup.object({
  first_name: yup.string().optional(),
  last_name: yup.string().optional(),
  gender: yup.string().oneOf(['male', 'female', 'other']).optional(),
  birth_date: yup.date().optional(),
  phone_number: yup.string().optional(),
  github_handle: yup.string().optional(),
  telegram_handle: yup.string().optional(),
  department: yup.string().optional(),
  specialization: yup.string().optional(),
  graduation_year: yup.number().optional(),
  university_id: yup.string().optional(),
  bio: yup.string().optional(),
  instagram_handle: yup.string().optional(),
  linkedin_handle: yup.string().optional(),
  leetcode_handle: yup.string().optional(),
  codeforce_handle: yup.string().optional(),
  resources: yup.array().of(
    yup.object({
      resource_name: yup.string().required(),
      resource_link: yup.string().url().required(),
    })
  ).optional()
});

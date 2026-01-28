import * as yup from 'yup';

export const diaryEntrySchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('Title is required')
    .min(2, 'Title is too short')
    .max(50, 'Title is too long'),

  feeling: yup
    .string()
    .required('Please select a feeling'),

  content: yup
    .string()
    .trim()
    .required('Content is required')
    .min(5, 'Content is too short')
    .max(500, 'Content is too long')
});
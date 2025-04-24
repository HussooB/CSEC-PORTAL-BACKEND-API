// src/utils/cloudinaryHelpers.ts
export const extractPublicId = (url: string | undefined, folder: string): string | null => {
  if (!url) return null;
  const fileName = url.split('/').pop()?.split('.')[0];
  return fileName ? `${folder}/${fileName}` : null;
};

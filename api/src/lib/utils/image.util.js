import path from 'path';
import crypto from 'crypto';

export const allowedImageTypes = ['.png', '.jpg', '.jpeg'];

export const mb100 = 100 * 1024 * 1024; // 100MB

export const sanitizeFile = (file, cb) => {
  // Check allowed extensions
  const isAllowedExt = allowedImageTypes.includes(path.extname(file.originalname.toLowerCase()));

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith('image/');

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    cb('Error: File type not allowed!');
  }
};

export const generateFilePath = ({ folder, file }) => {
  const vExt = file?.split('.').pop() ?? 'jpeg';
  const vFolder = folder ?? 'public';
  const vFile = crypto.randomBytes(8).toString('hex');

  return `${vFolder}/${vFile}.${vExt}`;
};
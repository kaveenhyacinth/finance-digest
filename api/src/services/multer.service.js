import multer from 'multer';

import { mb100, sanitizeFile } from '../lib/utils/image.util.js';

const storage = multer.memoryStorage();
export const uploader = multer({
  storage,
  limits: {
    fileSize: mb100, // 100MB
  },
  fileFilter: (_req, file, callback) => {
    sanitizeFile(file, callback);
  },
});

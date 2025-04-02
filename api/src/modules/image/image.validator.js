import { check } from 'express-validator';
import { allowedMimeTypes } from '../../lib/utils/image.util.js';
import { badRequestException } from '../../lib/utils/exception.util.js';

export const singleUploadValidator = [
  check('image').custom((value, { req }) => {
    if (!req.file) {
      throw badRequestException('Image file is required');
    }

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      throw badRequestException('Only JPEG, JPG and PNG images are allowed');
    }
    return true;
  }),
];
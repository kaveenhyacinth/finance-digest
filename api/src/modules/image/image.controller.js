import { errorRes, successRes } from '../../lib/utils/response.util.js';
import { uploadSingleImage } from './image.service.js';
import { badRequestException } from '../../lib/utils/exception.util.js';

export async function uploadSingle(req, res, next) {
  const file = req.file;
  if (!file) throw badRequestException('Image upload failed.');

  try {
    const image = await uploadSingleImage('public', file);
    return successRes(res, 201, { data: image, message: 'Image successfully uploaded' });
  } catch (error) {
    return errorRes(next, error);
  }
}
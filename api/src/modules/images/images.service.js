import { generateFilePath } from '../../lib/utils/image.util.js';
import admin from '../../../firebase/firebase-admin.init.cjs';

const bucket = admin.storage().bucket();

export async function uploadSingleImage(userId = '', file) {
  //TODO: Enable once authentication is done
  // if (!userId) throw unauthenticatedException('Invalid user')

  const fileName = file?.originalname?.split('.');
  fileName?.pop();
  const title = fileName?.join('.');

  const filePath = generateFilePath({ folder: userId, file: file.originalname });

  const blob = bucket.file(filePath);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  try {
    await new Promise((resolve, reject) => {
      blobStream.on('error', (error) => {
        reject(error);
      });
      blobStream.on('finish', () => {
        resolve();
      });
      blobStream.end(file.buffer);
    });

    const [signedUrl] = await blob.getSignedUrl({
      action: 'read',
      expires: new Date('2525-12-31T23:59:59Z'),
    });

    return {
      title,
      filePath,
      url: signedUrl,
    };
  } catch (error) {
    throw error;
  }
}

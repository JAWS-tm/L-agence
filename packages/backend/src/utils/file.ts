import multer from 'multer';
import fs from 'fs';
import { promisify } from 'util';
import { Response } from 'express';

const unlinkAsync = promisify(fs.unlink);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    let name = file.originalname.replaceAll(' ', '_');
    // Remove all special characters from filename
    name = name.replace(/[^a-zA-Z0-9._-]/g, '');
    cb(null, Date.now() + '_' + name);
  },
});

export const uploadMiddleware = multer({ storage: storage });

// Utils functions
export const deleteFiles = async (files: Express.Multer.File[]) => {
  for (const file of files) {
    await unlinkAsync(file.path);
  }
};

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const ACCEPTED_FILES_MIME_TYPES = [
  ...ACCEPTED_IMAGE_MIME_TYPES,
  'application/pdf',
];

export const checkFile = (
  file: Express.Multer.File,
  type: 'image' | 'file',
  res: Response
) => {
  const ACCEPTED_MIME_TYPES =
    type === 'image' ? ACCEPTED_IMAGE_MIME_TYPES : ACCEPTED_FILES_MIME_TYPES;

  if (!ACCEPTED_MIME_TYPES.includes(file.mimetype)) {
    deleteFiles([file]);
    return res.status(400).json({
      status: 400,
      message: `File ${
        file.originalname
      } is not an image. Accepted formats are: ${ACCEPTED_MIME_TYPES.join(
        ', '
      )}`,
    });
  }
  if (file.size > MAX_FILE_SIZE) {
    deleteFiles([file]);
    return res.status(400).json({
      status: 400,
      message: `File ${file.originalname} is too big. Max size is ${
        MAX_FILE_SIZE / 1024 / 1024
      }MB`,
    });
  }
};

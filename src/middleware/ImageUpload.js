import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import StatusError from '../utils/StatusError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ImageUpload {
  constructor() {
    this.uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
    this.createFolder();
  }

  createFolder() {
    if (!fs.existsSync(this.uploadFolder)) {
      fs.mkdirSync(this.uploadFolder, { recursive: true });
    }
  }

  generateFileName(originalname) {
    const randomNumber = Math.floor(Math.random() * 10000 + 10000);
    const fileName = `${Date.now()}_${randomNumber}${path.extname(originalname)}`;

    return fileName;
  }

  getMulterInstance() {
    const global = this;

    return multer({
      storage: multer.diskStorage({
        destination: this.uploadFolder,

        filename(req, file, callback) {
          const fileName = global.generateFileName(file.originalname);
          callback(null, fileName);
        },
      }),

      fileFilter(req, file, callback) {
        const allowedMimes = ['image/jpeg', 'image/png'];

        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new StatusError('Tipo de arquivo inválido', 400));
        }
      },

      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    });
  }
}

const imageUpload = new ImageUpload();
const upload = imageUpload.getMulterInstance();

export default upload;

/* eslint-disable */

import StatusError from '../utils/StatusError.js';
import multer from 'multer';

class ErrorHandler {
  handle(err, req, res, next) {
    if (err instanceof StatusError) {
      console.log(err);
      return res.status(err.statusCode).json({
        success: false,
        errors: [err.message],
      });
    }

    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          errors: ['O arquivo excede o tamanho máximo permitido'],
        });
      }
    }

    console.log(err);
    return res.status(500).json({
      success: false,
      errors: ['Erro interno no servidor'],
    });
  }
}

export default new ErrorHandler();

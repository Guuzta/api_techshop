/* eslint-disable */

import StatusError from '../utils/StatusError.js';

class ErrorHandler {
  handle(err, req, res, next) {
    if (err instanceof StatusError) {
      return res.status(err.statusCode).json({
        success: false,
        errors: [err.message],
      });
    }

    console.log(err);
    return res.status(500).json({
      success: false,
      errors: ['Erro interno no servidor'],
    });
  }
}

export default new ErrorHandler();

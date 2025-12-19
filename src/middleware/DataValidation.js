class DataValidation {
  validate(schemaName) {
    return async (req, res, next) => {
      try {
        await schemaName.validate(req.body, {
          abortEarly: false,
        });

        next();
      } catch (error) {
        const { errors } = error;

        return res.status(400).json({
          success: false,
          errors,
        });
      }
    };
  }
}

export default new DataValidation();

class DataValidation {
  validate(schemaName) {
    return async (req, res, next) => {
      const data = req.body.data ? JSON.parse(req.body.data) : req.body;

      try {
        await schemaName.validate(data, {
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

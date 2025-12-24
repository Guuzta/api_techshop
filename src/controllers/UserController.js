import userService from '../services/UserService.js';

class UserController {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const user = await userService.register({ name, email, password });

      return res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const accessToken = await userService.login({ email, password });

      return res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const userUpdates = await userService.update(req.body, req.userId);

      res.status(200).json({
        success: true,
        userUpdates,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await userService.delete(req.userId);

      return res.status(200).json({
        success: true,
        message: 'Usuário deletado com sucesso!',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

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

      const accessToken = await userService.login({ res, email, password });

      return res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { sessionId, userId } = req;

      await userService.logout(sessionId, userId);

      return res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { name, email } = req.body;
      const userUpdates = await userService.update(name, email, req.userId);

      return res.status(200).json({
        success: true,
        userUpdates,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;

      await userService.updatePassword(
        currentPassword,
        newPassword,
        req.userId,
      );

      return res.status(200).json({
        success: true,
        message: 'Senha atualizada com sucesso!',
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
        message: 'Usuário deletado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

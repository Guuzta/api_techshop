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
}

export default new UserController();

import authService from '../services/AuthService.js';

class AuthController {
  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

      const accessToken = await authService.refresh(res, refreshToken);

      return res.status(200).json(accessToken);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

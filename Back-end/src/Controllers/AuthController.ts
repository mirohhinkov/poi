import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import IAuthController from './IAuthController';
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

//See IAuthController.ts
class AuthController implements IAuthController {
  public isUserLogged(req: Request, _res: Response, next: NextFunction) {
    if (req.isAuthenticated()) return next();
    next(new AppError('You have to login to perform this operation', 401));
  }

  public login(req: Request, res: Response) {
    // console.log(req.isAuthenticated());
    const options = {
      maxAge: 86400 * 1000, // 24 hours
      httpOnly: false,
      secure: false,
    };
    const user = JSON.parse(JSON.stringify(req.user));
    delete user.password;
    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: '1d',
    });
    res.cookie('jwt', token, options);
    res.json({ status: 'successful', data: user });
  }

  public logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err: Error) => {
      if (err) return next(err);
      res.status(200).json({ status: 'successful' });
    });
  }

  public async myDeserialize(req: Request, _res: Response, next: NextFunction) {
    if (req.headers?.authorization?.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      if (token)
        req.user = (
          await promisify(jwt.verify)(token, process.env.SECRET)
        ).user;
    }
    next();
  }
}

export default new AuthController();

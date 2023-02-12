"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("../utils/AppError");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
//See IAuthController.ts
class AuthController {
    isUserLogged(req, _res, next) {
        if (req.isAuthenticated())
            return next();
        next(new AppError_1.AppError('You have to login to perform this operation', 401));
    }
    login(req, res) {
        // console.log(req.isAuthenticated());
        const options = {
            maxAge: 86400 * 1000,
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
    logout(req, res, next) {
        req.logout((err) => {
            if (err)
                return next(err);
            res.status(200).json({ status: 'successful' });
        });
    }
    async myDeserialize(req, _res, next) {
        if (req.headers?.authorization?.startsWith('Bearer')) {
            const token = req.headers.authorization.split(' ')[1];
            if (token)
                req.user = (await promisify(jwt.verify)(token, process.env.SECRET)).user;
        }
        next();
    }
}
exports.default = new AuthController();

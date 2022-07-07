import { NextFunction, Request, Response, Router } from 'express';
import AuthController from "../controller/auth.controller"
import authValidator from '../middleware/validator/auth.validator';
import validate from '../middleware/validator/validator';

const AuthRouter = Router();
AuthRouter.post('/register', validate(authValidator.register), AuthController.registration);
AuthRouter.post('/login', validate(authValidator.login), AuthController.login);
AuthRouter.get('/getRole', AuthController.getProfileInfo);

export default AuthRouter;

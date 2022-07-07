import { NextFunction, Request, Response, Router } from 'express';
import BrandRouter from './brand.route';
import AuthRouter from './auth.route';
import PhoneRouter from './phone.route';

const router = Router();
router.use("/auth", AuthRouter)
router.use("/brand", BrandRouter)
router.use("/phone", PhoneRouter)

export default router;

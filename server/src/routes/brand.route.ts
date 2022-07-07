import { NextFunction, Request, Response, Router } from 'express';
import brandController from '../controller/admin/brand.controller';
import Roles from '../enum/Roles.enum';
import checkRole from '../middleware/checkRole.middleware';
import brandValidator from '../middleware/validator/brand.validator';
import validate from '../middleware/validator/validator';

const BrandRouter = Router();
BrandRouter.post('/add', checkRole(Roles.ADMIN), validate(brandValidator.add), brandController.add)
BrandRouter.delete('/delete/:id', checkRole(Roles.ADMIN),  brandController.delete)
BrandRouter.get('/getList', brandController.getList)

export default BrandRouter;

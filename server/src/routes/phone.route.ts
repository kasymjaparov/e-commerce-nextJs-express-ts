import { Router } from 'express';
import phoneController from '../controller/admin/phone.controller';
import Roles from '../enum/Roles.enum';
import checkRole from '../middleware/checkRole.middleware';
import phoneValidator from '../middleware/validator/phone.validator';
import validate from '../middleware/validator/validator';

const PhoneRouter = Router();
PhoneRouter.post('/add', checkRole(Roles.ADMIN), validate(phoneValidator.add), phoneController.add)
PhoneRouter.get('/getList', phoneController.getList)
PhoneRouter.get('/getById/:id', phoneController.getById)
PhoneRouter.patch('/changeAmount', checkRole(Roles.ADMIN), validate(phoneValidator.changeAmount), phoneController.changeAmount)

export default PhoneRouter;

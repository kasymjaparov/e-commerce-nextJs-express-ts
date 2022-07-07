import { check } from "express-validator"

class PhoneValidator {
    add = [
        check("name").exists().withMessage("Заполните все поля"),
        check("rom").exists().withMessage("Заполните все поля"),
        check("logo").exists().withMessage("Заполните все поля"),
        check("price").exists().withMessage("Заполните все поля"),
        check("amount").exists().withMessage("Заполните все поля"),
        check("brandId").exists().withMessage("Заполните все поля"),
    ]
    changeAmount = [
        check("id").exists().withMessage("Заполните все поля"),
        check("amount").exists().withMessage("Заполните все поля"),
        check("status").exists().withMessage("Заполните все поля"),
        check("date").exists().withMessage("Заполните все поля"),
    ]

}
export default new PhoneValidator()
import { check } from "express-validator"

class BrandValidator {
    add = [
        check("name").exists().withMessage("Заполните все поля")
    ]

}
export default new BrandValidator()
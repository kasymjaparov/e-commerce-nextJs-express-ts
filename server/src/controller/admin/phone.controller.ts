import { NextFunction, Request, Response } from "express"
import phoneService from "../../service/admin/phone.service"

class PhoneController {
    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const message = await phoneService.add(req.body)
            return res.json({ message: message })
        } catch (error) {
            res.status(505).json({ message: error.message })
        }
    }
    async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const { result, total } = await phoneService.getList(req.query)
            return res.json({ result, total })
        }
        catch (error) {
            return res.status(505).json({ message: error.message })
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const phone = await phoneService.getById(Number(id))
            return res.json({ phone })
        }
        catch (error) {
            return res.status(505).json({ message: error.message })
        }
    }
    async changeAmount(req: Request, res: Response, next: NextFunction) {
        try {
            const message = await phoneService.changeAmount(req.body)
            return res.json({ message })
        }
        catch (error) {
            return res.status(505).json({ message: error.message })
        }
    }
}

export default new PhoneController()
import { NextFunction, Request, Response } from "express"
import authService from "../service/auth.service"

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const message = await authService.registration(req.body)
            return res.json(message)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await authService.login(req.body)
            return res.json(token)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

}

export default new AuthController()
import { NextFunction, Request, Response } from "express"
import authService from "../service/auth.service"

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const message = await authService.registration(req.body)
            return res.json(message)
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: error.message })
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await authService.login(req.body)
            return res.json(token)
        } catch (error) {
            console.log(error)
            res.status(404).json({ message: error.message })
        }
    }
    async getProfileInfo(req, res, next) {
        try {
            const token = req.headers.authorization
            const user = await authService.getProfileInfo(token)
            return res.json({ user })
        } catch (error) {
            res.status(505).json({ message: error.message })
        }
    }

}

export default new AuthController()
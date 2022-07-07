import { NextFunction, Request, Response } from "express"
import brandService from "../../service/admin/brand.service"

class BrandController {
    async add(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.body
            const message = await brandService.add(name)
            return res.json({ message: message })
        } catch (error) {
            res.status(505).json({ message: error.message })
        }
    }
    async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const brands = await brandService.getList()
            return res.json({ brands })
        } catch (error) {
            res.status(505).json({ message: error.message })
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const brands = await brandService.delete(Number(id))
            return res.json({ brands })
        } catch (error) {
            res.status(505).json({ message: error.message })
        }
    }
}

export default new BrandController()
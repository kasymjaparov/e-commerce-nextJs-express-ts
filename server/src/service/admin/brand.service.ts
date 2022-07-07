import { NextFunction, Request, Response } from "express"
import * as bcrypt from "bcrypt"
import { getRepository } from "typeorm"
import * as jwt from "jsonwebtoken"
import ApiError from "../../utils/exceptions"
import { Brand } from "../../entity/Brand"
import { Phone } from "../../entity/Phone"

class BrandService {
    async add(name: string) {
        try {
            const brandRepository = getRepository(Brand)
            const candidate = await brandRepository.findOne({ name: name })
            if (candidate) {
                throw ApiError.ClientError("Бренд с таким именем уже существует")
            }
            const brand = new Brand()
            brand.name = name
            await brand.save()
            return "Вы успешно создали бренд"
        } catch (error) {
            throw ApiError.Forbidden("Ошибка при добавлении бренда")
        }
    }
    async getList() {
        try {
            const brandRepository = getRepository(Brand)
            const brands = await brandRepository.find()
            return brands
        } catch (error) {
            throw ApiError.Forbidden("Ошибка при получении брендов")
        }
    }
    async delete(id: number) {
        try {
            const brandRepository = getRepository(Brand)
            const phoneRepository = getRepository(Phone)
            const phoneWithBrand = await phoneRepository.findOne({ brand: { id: id } })
            if (phoneWithBrand) {
                throw ApiError.ClientError("Бренд имеет телефоны")
            }
            const candidateDelete = await brandRepository.findOne({id})
            await brandRepository.remove(candidateDelete)
            return "Вы успешно удалили бренд"
        } catch (error) {
            throw ApiError.Forbidden("Ошибка при удалении бренда")
        }
    }
}

export default new BrandService()
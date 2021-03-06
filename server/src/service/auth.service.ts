import { NextFunction, Request, Response } from "express"
import * as bcrypt from "bcrypt"
import { getRepository } from "typeorm"
import { User } from "../entity/User"
import generateJwt from "../utils/generateJwt"
import { IUserProfile } from "../interface/auth.interface"
import ApiError from "../utils/exceptions"
import * as jwt from "jsonwebtoken"

class AuthService {
    async registration(body: IUserProfile) {
        try {
            const { email, password, role } = body
            const userRepository = getRepository(User)
            const candidate = await userRepository.findOne({ email })
            if (candidate) {
                throw ApiError.ClientError("Пользователь с таким email уже существует")
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = new User()
            user.email = email
            user.role = role
            user.password = hashPassword
            await user.save()
            return { message: "Успешно создан аккаунт" }
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
    async login(body: IUserProfile) {
        try {
            const { email, password } = body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                throw ApiError.ClientError("Пользователь не найден")
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                throw ApiError.ClientError("Указан неверный пароль")
            }
            const token = generateJwt(user.id, user.email, user.role)
            return { token }
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
    async getProfileInfo(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            return decoded
        } catch (error) {
            console.log(error)
            throw ApiError.Forbidden("Ошибка при получении роли")
        }
    }
}

export default new AuthService()
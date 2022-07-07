import { getRepository, Like } from "typeorm"
import ApiError from "../../utils/exceptions"
import { Brand } from "../../entity/Brand"
import { Phone } from "../../entity/Phone"
import { IPhoneData } from "../../interface/phone.interface"
import { Request } from "express"
import cloudinary from "../../utils/cloudinary"
import { History } from "../../entity/History"
import { History_Status } from "../../enum/HIstory_Status.enum"

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
};
class PhoneService {
    async add(data: IPhoneData) {
        try {
            const { name, rom, logo, price, amount, brandId } = data
            const brandRepository = getRepository(Brand)
            const brandOfPhone = await brandRepository.findOne({ id: brandId })
            const { url } = await cloudinary.uploader.upload(logo, options);
            await Phone.create({ name, rom, logo: url, price, amount, brand: brandOfPhone }).save()
            return "Вы успешно создали телефон"
        } catch (error) {
            throw ApiError.Forbidden("Ошибка при созданиии телефона")
        }
    }
    async getList(query) {
        try {
            const { skip = 0, take = 10, phoneName = "", brandName = "" } = query
            const phoneRepository = getRepository(Phone)
            const candidateBrand = await Brand.findOne({ where: { name: Like('%' + brandName + '%') } })
            const [result, total] = await phoneRepository.findAndCount(
                {
                    where: { name: Like('%' + phoneName + '%'), brand: candidateBrand },
                    take: take,
                    skip: skip,
                    relations: ["brand"]
                }
            )
            return { result, total }
        } catch (error) {
            throw ApiError.Forbidden("Ошибка при получении телефонов")
        }
    }
    async getById(id: number) {
        try {
            const phoneRepository = getRepository(Phone)
            const phone = await phoneRepository.find({ relations: ["brand"], where: { id } })
            return phone
        } catch (error) {
            throw ApiError.Forbidden("Ошибка при получении телефона по id")
        }
    }
    async changeAmount(body) {
        try {
            const { id, amount, status, date, price } = body
            const phoneRepository = getRepository(Phone)
            const candidatePhone = await phoneRepository.findOne({ id })
            await History.create({ amount, status, date, price, phone: candidatePhone }).save()
            status === History_Status.IN ? candidatePhone.amount += amount : candidatePhone.amount -= amount
            await phoneRepository.save(candidatePhone)
            return "Вы успешно изменили количество"
        } catch (error) {
            throw ApiError.Forbidden("Ошибка при изменении количества телефона")
        }
    }
}

export default new PhoneService()
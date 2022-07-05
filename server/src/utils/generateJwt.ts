const jwt = require("jsonwebtoken")

const generateJwt = (id, email, role): { id: number, email: string, role: number } => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    })
}
export default generateJwt
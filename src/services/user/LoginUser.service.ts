import { prisma } from "../../prisma/prisma";
import { compare } from "bcryptjs";
import { z } from "zod"
import { sign } from "jsonwebtoken"

interface LoginUserProps {
    email: string,
    password: string;
}

const LoginSchema = z.object({
    email: z.string().email({message: "Informe um email válido."}),
    password: z.string().min(6, {message: "A senha deve conter no minímo 6 caracteres"}).max(16, {message: "A senha deve conter no máximo 16 caracteres."})
})

class LoginUserService {
    async execute({ email, password }: LoginUserProps) {

        const resultParse = LoginSchema.safeParse({email, password})
        if(!resultParse.success) {
            return{
                Error: resultParse.error.flatten().fieldErrors
            }
        }
        const emailLowerCase = email.toLowerCase()
        const alreadyExistUser = await prisma.usuario.findFirst({
            where: {email: emailLowerCase}
        })

        if(!alreadyExistUser) {
            return {message: "Usuario ou senha inválidos."}
        }

        const passwordCompare = await compare(password, alreadyExistUser.password)

        if(!passwordCompare) {
            return {message: "Usuario ou senha inválidos."}
        }

        const token = sign(
            {
                id: alreadyExistUser.id,
                name: alreadyExistUser.name,
            },
            process.env.JWT_SECRET,
            {
                subject: alreadyExistUser.id,
                expiresIn: "30d"
            }
        )

        return {
            id: alreadyExistUser.id,
            name: alreadyExistUser.name,
            email: alreadyExistUser.email,
            token: token
        }

    }
}

export { LoginUserService }
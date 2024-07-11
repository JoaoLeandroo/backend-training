import { prisma } from "../../prisma/prisma";
import { compare, hash } from "bcryptjs";
import { z } from "zod"

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

        const alreadyExistUser = await prisma.usuario.findFirst({
            where: {email: email}
        })

        if(!alreadyExistUser) {
            return {message: "Usuario ou senha inválidos."}
        }

        const passwordCompare = await hash(password, alreadyExistUser.password)

        if(!passwordCompare) {
            return {message: "Usuario ou senha inválidossss"}
        }

        return {
            id: alreadyExistUser.id,
            name: alreadyExistUser.name,
            email: alreadyExistUser.email,
        }

    }
}

export { LoginUserService }
import { prisma } from "../../prisma/prisma";
import { hash } from "bcryptjs";
import { z } from "zod"

const RegisterSchema = z.object({
    name: z.string().min(3, {message: "Insira um nome válido."}),
    email: z.string().email({message: "Informe um email válido."}),
    password: z.string().min(6, {message: "A senha deve conter no minímo 6 caracters."}).max(16, {message: "A senha deve ter no máximo 16 caracteres."}),
})

interface RegisterUserProps {
    name: string;
    email: string;
    password: string;
}

class RegisterUserService {
    async execute({ name, email, password }: RegisterUserProps) {

        const resultParse = RegisterSchema.safeParse({name, email, password})
        if(!resultParse.success) {
            return {
                Error: resultParse.error.flatten().fieldErrors
            }
        }

        const emailLowerCase = email.toLowerCase()
        const alreadyExistUser = await prisma.usuario.findFirst({
            where: {email: emailLowerCase}
        })

        if(alreadyExistUser) {
            return { message: "Usuario já cadastrado." }
        }
        const passwordHash = await hash(password, 8)

        const user = await prisma.usuario.create({
            data: {
                name: name,
                email: emailLowerCase,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                createAt: true
            }
        })

        return user
        
    }
}

export { RegisterUserService }
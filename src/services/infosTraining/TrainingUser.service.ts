import { prisma } from "../../prisma/prisma"

interface TrainingUserProps {
    loc: string
}

class TrainingUserService {
    async execute({ loc }: TrainingUserProps) {
        const idTeste = "88adfcdf-0952-4c0b-839d-5e257779aeb5"

        const buscarUser = await prisma.training.findFirst({
            where: {userId: idTeste}
        })
        const arr = []

        if(!buscarUser) {
            console.log("novo usuario")
            const register = await prisma.training.create({
                data: {
                    userId: idTeste,
                    location: arr
                }
            })
            return register
        }

        const user = await prisma.training.findUnique({
            where: {userId: idTeste}
        })

        arr.push(...user.location, loc)

        console.log("Update")
        const update = await prisma.training.update({
            where: { userId: idTeste },
            data: {location: arr}
        })


        return update

    }
}

export { TrainingUserService }
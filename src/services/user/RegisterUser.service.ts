
// id String @id @default(uuid())
// name String
// email String @unique
// password String
// createAt DateTime @default(now())
// updateAt DateTime @updatedAt

interface RegisterUserProps {
    name: string;
    email: string;
    password: string;
}

class RegisterUserService {
    async execute({ name, email, password }: RegisterUserProps) {

    }
}

export { RegisterUserService }
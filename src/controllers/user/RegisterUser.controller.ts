import { Request, Response } from "express";
import { RegisterUserService } from "../../services/user/RegisterUser.service";

class RegisterUserController {
    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body
        const registerUserService = new RegisterUserService()
    
        const user = await registerUserService.execute({
            name,
            email,
            password
        })

        return response.json(user)
    }
}

export { RegisterUserController }
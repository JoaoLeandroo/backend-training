import { Request, Response } from "express";
import { LoginUserService } from "../../services/user/LoginUser.service";

class LoginUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body
        const loginUserService = new LoginUserService()
        const auth = await loginUserService.execute({
            email,
            password,
        })

        return response.json(auth)
    }
}

export { LoginUserController }
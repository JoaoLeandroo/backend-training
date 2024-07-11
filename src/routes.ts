import { Request, Response, Router } from "express";
import { RegisterUserController } from "./controllers/user/RegisterUser.controller";

const router = Router()

router.get("/teste", (request: Request, response: Response) => {
    return response.send("Hello World!")
})

router.post("/register", new RegisterUserController().handle)

export { router }
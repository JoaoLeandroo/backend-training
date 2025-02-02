import { Request, Response, Router } from "express";
import { RegisterUserController } from "./controllers/user/RegisterUser.controller";
import { LoginUserController } from "./controllers/user/LoginUser.controller";
import { TrainingUserController } from "./controllers/infosTraining/TrainingUser.controller";

const router = Router()

router.get("/teste", (request: Request, response: Response) => {
    return response.send("Hello World!")
})

router.post("/register", new RegisterUserController().handle)
router.post("/session", new LoginUserController().handle)
router.post("/training", new TrainingUserController().handle)

export { router }
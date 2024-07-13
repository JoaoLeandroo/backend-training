import { TrainingUserService } from "../../services/infosTraining/TrainingUser.service";
import { Request, Response } from "express";

class TrainingUserController {
    async handle(request: Request, response: Response) {
        const { loc } = request.body
        const trainingUserService = new TrainingUserService()
        const training = trainingUserService.execute({
            loc
        })

        return response.json(training)
    }

}

export { TrainingUserController }
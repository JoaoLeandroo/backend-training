import { Request, Response, Router } from "express";

const router = Router()

router.get("/teste", (request: Request, response: Response) => {
    return response.send("Hello World!")
})

export { router }
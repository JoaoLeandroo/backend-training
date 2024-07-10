import express from "express"
import { router } from "./routes"


const server = express()
server.use(express.json())
server.use(router)

server.listen(5353, () => console.log(`Servidor rodando na porta - http://localhost:5353`))
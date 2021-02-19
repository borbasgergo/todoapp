import express from "express"

import { createConnection } from "typeorm"

import { User } from "./entity/User"
import { Todo } from "./entity/Todo"

import { router as todoRouter } from "./routers/TodoRoutes"
import { router as baseRouters } from "./routers/BaseRouters"
import { router as userRouter } from "./routers/UserRouters"

import { Repo, repositoryI } from "./repository/Repository"


import bodyParser from "body-parser"
import cors from "cors"
import { authMiddleware } from "./middlewares/authMiddleware"


const app = express()
const port = 9000

const entities = [
    Todo,
    User
]


createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "typeorm",
    entities: entities,
    synchronize: true,
}).then(
    async connection => {

        let repoObj: repositoryI = {}

        entities.forEach(entity => {
            repoObj[entity.prototype.constructor.name] = connection.getRepository(entity)
        })
         
        Repo.create(repoObj)
    
        app.use(cors())
        app.use(bodyParser.urlencoded( { extended: true } ))
        app.use(bodyParser.json())
        //app.use("/", baseRouters)  just for testing if the routing works or not at all
        app.use("/todo", authMiddleware, todoRouter)
        app.use("/user", userRouter)
        

        app.listen(port, () => {
            console.log("Server is running")
        })
    }
).catch(e => console.log(e))


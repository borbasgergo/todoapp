import { Request, Response } from "express"
import { Todo } from "../entity/Todo"
import { User } from "../entity/User"
import { Repo } from "../repository/Repository"

export abstract class TodoController {

    static async getAllTodoForUser(req: Request, res: Response){

        const TodoRepo = Repo.getRepo("Todo") 

        const user = (req as any).user
        
        return res.json(
            { 
                todos: await TodoRepo.find({
                    where: {
                        userId: user.id
                    }
                })
            }
        )
    }

    static async delete(req: Request, res: Response){

        const TodoRepo = Repo.getRepo("Todo")
        
        try {
            await TodoRepo.delete(req.params.id)
            return res.json({
                success: "todo deleted"
            })
        } catch ( e ) {
            return res.json({
                error: "couldn't delete todo"
            })
        } 
        

    }

    static async add( req: Request, res: Response) {

        const TodoRepo = Repo.getRepo("Todo")

        try {

            const task = new Todo()

            task.do = req.body.do 
            task.isDone = false,
            task.userId = (req as any).user.id

            const newCreatedTask = await TodoRepo.save(task)

            return res.json({
                success: "saved",
                todo: newCreatedTask
            })

        } catch( e ) {
            return res.json({
                error: "Error occured"
            })
        }
    }

}
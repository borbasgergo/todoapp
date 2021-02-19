import express from "express"
import { TodoController } from "../controllers/TodoController"
import { authMiddleware } from "../middlewares/authMiddleware"

export const router = express.Router()

router.get("/", TodoController.getAllTodoForUser)
router.post("/delete/:id", TodoController.delete)
router.post("/add", TodoController.add)
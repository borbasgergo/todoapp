
import express from "express"
import { UserController } from "../controllers/UserController"
import { authMiddleware } from "../middlewares/authMiddleware"

export const router = express.Router()

router.post("/login", UserController.login)
router.post("/register", UserController.register)
router.post("/", [ authMiddleware , UserController.get])



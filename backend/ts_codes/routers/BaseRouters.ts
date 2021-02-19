import express from "express"
import { RouterController } from "../controllers/RouteController"

export const router = express.Router()

router.get("/", RouterController.get)
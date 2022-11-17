import { Router } from "express"
import useJson from "../middlewares/useJson.middleware"

import AdminRouter from "./v1/admin"
import UserRouter from "./v1/user"

const router = Router()

router.use('/api/v1/admin', useJson, AdminRouter)
router.use('/api/v1/user', useJson, UserRouter)

export default router
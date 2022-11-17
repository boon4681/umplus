import { Router } from "express"
import useJson from "../middlewares/useJson.middleware"

import AdminRouter from "./api/admin"
import UserRouter from "./api/user"

const router = Router()

router.use('/api/admin', useJson, AdminRouter)
router.use('/api/user', useJson, UserRouter)

export default router
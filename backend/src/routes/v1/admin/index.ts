import { DummyRegister } from "../../../controllers/auth.controller"
import { Admin } from "../../../controllers/user.controller"
import { useAdminAuth } from "../../../middlewares/auth.middleware"
// const { useJson } = require('../../../../middlewares/useJson.middleware')

const router = require('express').Router()

import AuthRoutes from "./auth"
import TranscationRoutes from "./transaction"

router.use('/auth', AuthRoutes)
router.post('/dummy', useAdminAuth, DummyRegister)
router.post('/all_user', useAdminAuth, Admin.getAllUser)
router.use('/transaction', useAdminAuth, TranscationRoutes)

export default router
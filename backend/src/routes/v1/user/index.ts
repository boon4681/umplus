const { User } = require('../../../controllers/user.controller')
const { useUserAuth } = require('../../../middlewares/auth.middleware')
// const { useJson } = require('../../../../middlewares/useJson.middleware')

const router = require('express').Router()

import AdminRoutes from "./auth"
import TransctionRoutes from "./transction"

router.use('/auth', AdminRoutes)
router.post('/@me', useUserAuth, User.me)
router.use('/transaction', useUserAuth, TransctionRoutes)

export default router
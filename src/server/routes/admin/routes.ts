import {Router} from 'express'
import {User} from './user'
import {Order} from './order'
export const router = Router()

router.use("/user",new User().routes)
router.use("/order",new Order().routes)

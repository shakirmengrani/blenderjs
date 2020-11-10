import {Router} from 'express'
import { Order } from './order'
import {User} from './user'
export const router = Router()

router.use("/user",new User().routes)
router.use("/order",new Order().routes)

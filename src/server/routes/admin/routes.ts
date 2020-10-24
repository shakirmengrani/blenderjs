import {Router} from 'express'
import {User} from './user'
export const router = Router()

router.use("/user",new User().routes)

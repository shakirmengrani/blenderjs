import {Router} from 'express'
import User from './user/controller'
const r = Router()

r.use("/user",new User().routes)
export default r
import { encrypt } from '../../../library/encryption'
import { issueToken } from '../../../library/auth'
import { OTP } from '../../../library/otp'
import {getRepository} from 'typeorm'
import {User} from '../../../entity/User'
import {UserRole} from '../../../entity/UserRole'
import { removeFromObject } from '../../../library/objectFilter'
import * as message from '../../../constant/message'

export class AppService {
    private otp: OTP
    constructor(){
        this.otp = new OTP()   
    }

    async login(mobile: string, password: string): Promise<object | Error>{
        const user = await getRepository(User).findOne({
            where: {mobile, password: encrypt(password)},
            relations: ["roles"]
        })
        if(user){
            return {
                token: issueToken({id: user.id, role: user.roles[0].name})["token"],
                refresh: issueToken({id: user.id, role: user.roles[0].name}, "7d")["token"]
            }
        }
        throw new Error(message.ErrorMsg.USER_NOT_FOUND)
    }

    async register(params: object): Promise<User | Error>{
        try{
            const newUser = new User()
            const role = await getRepository(UserRole).findOne(params["role_id"])
            for(let param of Object.keys(removeFromObject(params, ["role_id"])[0])){
                if(param === "password"){
                    params[param] = encrypt(params[param])
                }
                newUser[param] = params[param]
            }
            newUser.roles = [role]
            return getRepository(User).save(newUser)
        }catch(err){
            throw new Error(err.message)
        }
    }

    generateOtp(): string{
        return this.otp.generate()
    }

    verifyOtp(token: string): boolean{
        return this.otp.verify(token)
    }
}
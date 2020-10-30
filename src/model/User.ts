import { getRepository } from 'typeorm'
import { User } from '../entity/User'
import { UserRole } from '../entity/UserRole'
import { encrypt } from '../library/encryption'
import { issueToken } from '../library/auth'
import * as messages from '../constant/message'
export class UserModel{

    static async getRoleById(id: number): Promise<UserRole>{
        return getRepository(UserRole).findOne(id)
    }

    static async getUserById(id: number): Promise<User>{
        return getRepository(User).findOne(id, {relations: ["roles"]})
    }

    static async getUserByMobile(mobile: string): Promise<User>{
        return getRepository(User).findOne({mobile}, {relations: ["roles"]})
    }

    static async createUser(params: Object, role_id: number): Promise<User>{
        const newUser = new User()
        const role = await this.getRoleById(role_id)
        for(let param of Object.keys(params)){
            if(param === "password"){
                params[param] = encrypt(params[param])
            }
            newUser[param] = params[param]
        }
        newUser.roles = [role]
        return getRepository(User).save(newUser)
    }

    static async loginByEmailMobile(email: string| null, mobile: string | null, password: string): Promise<object> {
        let findParams = {password: encrypt(password)}
        if(email){
            findParams["email"] = email
        }
        if(mobile){
            findParams["mobile"] = mobile
        }
        const user: User = await getRepository(User).findOne(findParams, {relations: ["roles"]})
        if(user){
            return {
                token: issueToken({id: user.id, role: user.roles[0].name})["token"],
                refresh: issueToken({id: user.id, role: user.roles[0].name}, "7d")["token"]
            }
        }
        throw new Error(messages.Error(messages.ErrorMsg.USER_NOT_FOUND))
    }

    static async loginByToken(id: number): Promise<object>{
        const user: User = await getRepository(User).findOne(id, {relations: ["roles"]})
        if(user){
            return {
                token: issueToken({id: user.id, role: user.roles[0].name})["token"],
                refresh: issueToken({id: user.id, role: user.roles[0].name}, "7d")["token"]
            }
        }
        throw new Error(messages.Error(messages.ErrorMsg.USER_NOT_FOUND))
    }
}
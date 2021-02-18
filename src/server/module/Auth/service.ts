import { Cryptor, aesEncryption, OTP, JWT } from '../../../library/crypto'
import { getRepository } from 'typeorm'
import { User } from '../../../entity/User'
import { UserRole } from '../../../entity/UserRole'
import { mapObjects } from '../../helpers/objectFilter'
import * as message from '../../../constant/message'
import { config as AppConfig } from '../../../config/app'
import { LoginResponse } from './type'
export class AuthService {
    private otp: OTP
    private aesCrypt: aesEncryption
    private jwt: JWT

    constructor() {
        this.aesCrypt = Cryptor.makeAES(AppConfig.auth.encryptKey)
        this.otp = Cryptor.makeOTP({ digits: 6 }, "JZNQIL3AIIFBGHSF")
        this.jwt = Cryptor.makeJWT({
            algorithm: 'HS256',
            issuer: AppConfig.openid.jwt.issuer,
            audience: AppConfig.openid.jwt.audience,
            expiresIn: AppConfig.openid.jwt.expiresIn
        }, AppConfig.openid.jwt.secretOrKey)
    }

    async login(params: User): Promise<LoginResponse | Error> {
        const user = await getRepository(User, ).findOne({
            where: { mobile: params["mobile"], password: this.aesCrypt.encrypt(params["password"]) },
            relations: ["roles"]
        })
        if (user) {
            return {
                token: this.jwt.issueToken({ id: user.id, role: user.roles[0].name }),
                refreshToken: this.jwt.issueToken({ id: user.id, role: user.roles[0].name }, "7d")
            }
        }
        throw new Error(message.ErrorMsg.USER_NOT_FOUND)
    }

    async register(params: User, role_id: number): Promise<User | Error> {
        try {
            const newUser = new User()
            const role = await getRepository(UserRole).findOne(role_id)
            if(params["password"]) {
                params["password"] = this.aesCrypt.encrypt(params["password"])
            }
            mapObjects(newUser, params)
            newUser.roles = [role]
            return await getRepository(User).save(newUser)
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async me(user_id): Promise<User | Error>{
        const user = await getRepository(User).findOne(user_id, {relations: ["roles"]})
        return user
    }

    generateOtp(): string {
        return this.otp.generate()
    }

    verifyOtp(token: string): boolean {
        return this.otp.verify(token)
    }
}
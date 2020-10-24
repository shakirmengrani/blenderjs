import { JWT, JWK } from 'jose'
import * as jsonwebtoken from 'jsonwebtoken'
import {config as AppConfig} from '../config/app'


export const generateKey = (payload: object) => {
    payload["iat"] = Date.now()
    return JWT.sign(payload, JWK.asKey(AppConfig.openid.jwt.secretOrKey), {audience: AppConfig.openid.jwt.audience, expiresIn: "1d", algorithm: "HS256"});
}

export const verify = (token: string = null) => {
    return JWT.verify(token, JWK.asKey(AppConfig.openid.jwt.secretOrKey))
}

export const issueToken = (user: object, expiresIn: string=AppConfig.openid.jwt.expiresIn): object => {
    const payload = {
        user, "iat": Date.now(), "aud": AppConfig.openid.jwt.audience
    } 
    const token = jsonwebtoken.sign({user}, AppConfig.openid.jwt.secretOrKey, {
        algorithm: 'HS256',
        audience: AppConfig.openid.jwt.audience,
        expiresIn
    })
    return {
        token
    }
}

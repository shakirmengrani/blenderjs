import * as passport from 'passport'
import {config as AppConfig} from '../config/app'
import { dateComp } from './date'
import {Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import * as messages from '../constant/message'
const verify_jwt = (jwt_payload, done) => {
    // do some logical thing
    if(jwt_payload.aud == AppConfig.openid.jwt.audience){
        if(dateComp(Math.floor(new Date().getTime() / 1000), jwt_payload.exp, 'gt')){
            return done(null, jwt_payload.user)
        }
        return done(messages.ErrorMsg.TOKEN_EXPIRED, null)
    }else{
        return done(messages.ErrorMsg.UN_RECOGNIZED_TOKEN, null)
    }
}

passport.serializeUser((user, done) => {
    // do some logical thing
    return done(null, user)
});

passport.deserializeUser((user, done) => {
    // do some logical thing
    return done(null, user)
})

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: AppConfig.openid.jwt.secretOrKey,
    // issuer: openid.jwt.issuer,
    audience: AppConfig.openid.jwt.audience,
    algorithms: ["HS256"]
}, verify_jwt))



export const Passport = passport
import * as passport from 'passport'
import {config as AppConfig} from '../config/app'
import { dateComp } from './date'
import {Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const verify_jwt = (jwt_payload, done) => {
    // do some logical thing
    console.log(jwt_payload, jwt_payload.exp, jwt_payload.iat, new Date().getTime())
    if(jwt_payload.aud == AppConfig.openid.jwt.audience){
        if(dateComp(Math.floor(new Date().getTime() / 1000), jwt_payload.exp, 'gt')){
            return done(null, jwt_payload.user)
        }
        return done("token has beed expired", null)
    }else{
        return done("un-recognized token", null)
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




module.exports = passport;

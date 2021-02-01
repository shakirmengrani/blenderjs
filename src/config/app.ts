import * as dotenv from 'dotenv'
dotenv.config()
export const config = {
    https: process.env.HTTPS,
    env:{
        provider: 'dotenv'
    },
    auth: {
        encryptKey: process.env.AUTH_KEY.split(",").map(c => parseInt(c)),
        examptKeyword: ["login", "register", "forget"]
    },
    middlewares: [
        {"url": "./middlewares/response", "pos": "before"},
        {"url": "./middlewares/passport-auth", "pos": "before"},
        {"url": "./middlewares/role", "pos": "before"},
        // {"url": "./middlewares/error", "pos": "after"},
    ],
    pagination: {
        limit: 20
    },
    db:{
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        sync: process.env.DB_SYNC == "true" ? true : false,
        logging: process.env.DB_LOGGING == "true" ? true : false,
        dialect: "postgres"
    },
    redis:{
        host: process.env.REDIS,
        port: process.env.REDIS_PORT
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_USER, // generated ethereal user
            pass: process.env.MAIL_PASSWORD // generated ethereal password
        }
    },
    storage: {
        disk: "storageS3",
        key: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET,
        bucket: process.env.AWS_BUCKET
    },
    openid: {
        jwt: {
            secretOrKey: process.env.JWT_SECRET,
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUD,
            expiresIn: process.env.JWT_EXP
        },
        google:{
            apiKey: "AIzaSyBfXlzS1b4Yv62rAaONGAJTmbRUhM6_pU0"
        },
        facebook: {
            clientID: "<Facebook AppId>",
            clientSecret: "<Facebook AppSecrent>",
            callbackURL: "<Facebook callback>"
        }
    }
}

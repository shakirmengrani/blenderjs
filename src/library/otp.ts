import { authenticator } from 'otplib'

export class OTP {
    private secret: string = "JZNQIL3AIIFBGHSF"

    constructor(opts = {}){
        authenticator.options = opts
    }

    public generate(): string{
        return authenticator.generate(this.secret)
    }

    public verify(token): boolean{
        return authenticator.verify({token: token, secret: this.secret})
    }
}
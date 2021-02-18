import { SHA256, MD5 } from 'crypto-js'
import * as aes from 'aes-js'
import * as jsonwebtoken from 'jsonwebtoken'
import { ec } from 'elliptic'
import * as mkcert from 'mkcert'
import { authenticator } from 'otplib'



export class OTP {
    private _secret: string = ""

    constructor(opts = {}, secret: string){
        authenticator.options = opts
        this._secret = secret
    }

    generate(): string{
        return authenticator.generate(this._secret)
    }

    verify(token): boolean{
        return authenticator.verify({token: token, secret: this._secret})
    }
}

export class aesEncryption {

    private _secret: number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    constructor(secret: number[]) {
        this._secret = secret
    }

    encrypt(data: string): string {
        let textBytes = aes.utils.utf8.toBytes(data);
        let aesCtr = new aes.ModeOfOperation.ctr(this._secret, new aes.Counter(5));
        let encryptedBytes = aesCtr.encrypt(textBytes);
        let encryptedHex = aes.utils.hex.fromBytes(encryptedBytes);
        return encryptedHex;
    }

    decrypt(data: string): string {
    let encryptedBytes = aes.utils.hex.toBytes(data);
    let aesCtr = new aes.ModeOfOperation.ctr(this._secret, new aes.Counter(5));
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);
    let decryptedText = aes.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
    }
}


export class JWT {
    private _payload: jsonwebtoken.SignOptions = {}
    private _secret: string
    constructor(opts: jsonwebtoken.SignOptions, secret: string) {
        this._payload = opts
        this._secret = secret
    }

    issueToken(data: object, expiresIn: string | null = null): String | Error {
        if(expiresIn){
            this._payload.expiresIn = expiresIn
        }
        return jsonwebtoken.sign({ user: data }, this._secret, this._payload)
    }

    verify(token: string): object | string {
        return jsonwebtoken.verify(token, this._secret)
    }
}

export type CertInfo = {
    caKey: string,
    caCert: string,
    certKey: string
    certCert: string
}

export class Cert {
    private _opts: mkcert.CACertificateInfo
    private _domain: string[]
    constructor(opts: mkcert.CACertificateInfo, domains: string[]) {
        this._opts = opts
        this._domain = domains
    }


    async create(): Promise<CertInfo> {
        const ca = await mkcert.createCA(this._opts)
        const cert = await mkcert.createCert({ caKey: ca.key, caCert: ca.cert, domains: this._domain, validityDays: this._opts.validityDays })
        return { caKey: ca.key, caCert: ca.cert, certKey: cert.key, certCert: cert.cert }
    }
}

export enum Hashing {
    SHA256,
    MD5
}

export class Cryptor {
    private static _AES: aesEncryption
    private static _elliptic: ec
    private static _JWT: JWT
    private static _OTP: OTP

    static makeAES(secret: number[]) {
        if (!Cryptor._AES) {
            Cryptor._AES = new aesEncryption(secret)
        }
        return Cryptor._AES
    }

    static makeElliptic(curve: string = "secp256k1") {
        if (!Cryptor._elliptic) {
            Cryptor._elliptic = new ec(curve)
        }
        return Cryptor._elliptic
    }

    static makeJWT(opts: jsonwebtoken.SignOptions, secret: string) {
        if (!Cryptor._JWT) {
            Cryptor._JWT = new JWT(opts, secret)
        }
        return Cryptor._JWT
    }

    static makeOTP(opts, secret): OTP{
        if (!Cryptor._OTP) {
            Cryptor._OTP = new OTP(opts, secret)
        }
        return Cryptor._OTP
    }

    static Hash(data: string, hash: Hashing): string | null {
        switch (hash) {
            case Hashing.SHA256:
                return SHA256(data).toString()
            case Hashing.MD5:
                return MD5(data).toString()
            default:
                return null
        }
    }
} 
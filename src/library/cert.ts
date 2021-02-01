import * as mkcert from 'mkcert'
import * as fs from 'fs'
import { config as AppConfig } from '../config/app'

export default class Cert {

    async create(){
        if(AppConfig.https == "true" && 
        !fs.existsSync("/code/src/ca.key") &&
        !fs.existsSync("/code/src/ca.cert") &&
        !fs.existsSync("/code/src/cert.key") &&
        !fs.existsSync("/code/src/cert.cert")){
            const ca = await mkcert.createCA({
                organization: '76dev',
                countryCode: 'PK',
                state: 'sindh',
                locality: 'pakistani',
                validityDays: 365
            })
            const cert = await mkcert.createCert({
                caKey: ca.key,
                caCert: ca.cert,
                domains: ["127.0.0.1", "localhost", "api.example.com"],
                validityDays: 365
            })
            fs.writeFileSync("/code/src/ca.key",ca.key)
            fs.writeFileSync("/code/src/ca.cert",ca.cert)
            fs.writeFileSync("/code/src/cert.key",cert.key)
            fs.writeFileSync("/code/src/cert.cert",cert.cert)
        }
    }

}

(async ()=> {
   await new Cert().create()
})()
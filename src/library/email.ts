import appConfig from '../config/app'
import nodemailer from 'nodemailer'
import fs from 'fs'
import Mustache from 'mustache'


export default class {
    private transporter: nodemailer.Transporter
    
    constructor(){
        this.transporter = nodemailer.createTransport(appConfig.mail)  
    }
    
    sendMail(payload: any){
        return this.transporter.sendMail({
            from: 'info@example.com', // sender address
            to: payload.to, // list of receivers
            subject: payload.subject, // Subject line
            text: payload.text, // plain text body
            html: payload.html // html body
        });    
    }

    async mailWithTemplate (filename: fs.PathLike, to: string, subject: string, text: string, view: string) {
        try{
            const data = fs.readFileSync(filename);
            if(data){
                const _template = Mustache.render(data.toString(), view);
                const email = await this.sendMail({to, subject, text, html: _template});
                console.log("mail", email)
            }
        }catch(err) {
            console.log("err", err)
            return err;
        }
    }

}
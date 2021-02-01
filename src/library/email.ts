import {config as appConfig} from '../config/app'
import * as nodemailer from 'nodemailer'
import * as fs from 'fs'
import * as Mustache from 'mustache'


export class Mail {
    private transporter: nodemailer.Transporter
    
    constructor(){
        this.transporter = nodemailer.createTransport(appConfig.mail)  
    }
    
    sendMail(payload: any): Promise<nodemailer.SentMessageInfo>{
        return this.transporter.sendMail({
            from: 'info@localhost', // sender address
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
            return err;
        }
    }

}
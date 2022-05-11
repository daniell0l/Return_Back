import nodemailer from 'nodemailer'
import { mailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "124c6c1b885dd4",
        pass: "624ee831189869"
    }
});


export class NodemailerMailAdapter implements mailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Daniel Medrado <danielocarahotmail.com@gmail.com>',
            subject,
            html: body,
        });
    }
}    
 
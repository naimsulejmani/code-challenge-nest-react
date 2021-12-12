import { EmailType } from './EmailType';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import  { ServerClient } from 'postmark';
@Injectable()
export class EmailService {
    
  client: ServerClient = new ServerClient(
    'b94a8909-d5d4-4c0c-bb88-f4555b4ad147',
  );
  messageStream: string = 'code-challenge-1';
    sendEmail(from:string, to:string, subject:string, data:string, emailType: EmailType) {

        let htmlBody: string = "";
        if (emailType == EmailType.REGISTRATION) {
            htmlBody = `<a href='http://localhost:3000/auth/confirm/${data}'>Click here to confirm!</a>`
        }
        else {
            htmlBody = `Your password is: <strong>${data}</strong>`
        }
        this.client.sendEmail({
            "From": from ? from:"naim.sulejmani@riinvest.net",
            "To": to,
            "Subject": subject,
            "HtmlBody": htmlBody
        }, (response) => {
            console.log("EMAIL RESPONSE => ",response)
      })
  }
}
                            
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';

export interface SendEmailOptions {
   to: string;
   subject: string;
   htmlBody: string;
   // TODO attachments
}

// TODO attachments

export class EmailService {

   private transport = nodemailer.createTransport({
      service: envs.MAILER_SERVICE,
      auth: {
         user: envs.MAILER_EMAIL,
         pass: envs.MAILER_SECRET_KEY
      }
   });
   constructor() {
      
   }

   sendEmail = async ( options: SendEmailOptions ): Promise<boolean> => {
      const { to, subject, htmlBody } = options;
      const sentInformation = await this.transport.sendMail({
         to, 
         subject,
         html: htmlBody
      });
      console.log('<--------------- JK Email.service --------------->');
      console.log(sentInformation);
      try {
         return true;
      } catch (error) {
         return false;
      }
   }
}
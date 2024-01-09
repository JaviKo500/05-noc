import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';

export interface SendEmailOptions {
   to: string | string [];
   subject: string;
   htmlBody: string;
   attachments?: Attachment[];
}

interface Attachment {
   filename: string;
   path: string;
}


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
      const { to, subject, htmlBody, attachments = [] } = options;
      const sentInformation = await this.transport.sendMail({
         to, 
         subject,
         html: htmlBody,
         attachments
      });
      console.log('<--------------- JK Email.service --------------->');
      console.log(sentInformation);
      try {
         return true;
      } catch (error) {
         return false;
      }
   }

   sendEmailWithFileSystemLogs = async ( to: string | string [] ) => {
      const subject = 'Logs server';
      const htmlBody =  `
         <h3>Logs system</h3>
         <p>test</p>
         <p>test 2-1</p>
      `;

      const attachments: Attachment [] = [
         { filename: 'logs-all.log', path: './logs/logs-all.log' },
         { filename: 'logs-high.log', path: './logs/logs-high.log' },
      ];

      return await this.sendEmail( {
         to,
         subject,
         attachments,
         htmlBody
      } );
   }
}
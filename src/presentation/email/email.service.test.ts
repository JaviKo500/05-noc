import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions } from "./email.service";

describe('Email.service.test', () => {

   const mockSendMail = jest.fn();

   nodemailer.createTransport = jest.fn().mockReturnValue({
      sendMail: mockSendMail
   });
   const emailService = new EmailService();

   beforeEach(() => jest.clearAllMocks());
   test( 'should send email', async () => {

      const options: SendEmailOptions = {
         to: 'javikogutierrez64@gmail.com',
         subject: 'test subject',
         htmlBody: '<h1>test html body</h1>',
         attachments: []
      };
      await emailService.sendEmail(options); 
      expect( mockSendMail ).toHaveBeenCalledWith({
         to: 'javikogutierrez64@gmail.com',
         subject: 'test subject',
         html: '<h1>test html body</h1>',
         attachments: expect.any(Array)
      });
   });

   test( 'check error in send email', async () => {

      const options: SendEmailOptions = {
         to: '',
         subject: 'test subject',
         htmlBody: '<h1>test html body</h1>',
         attachments: []
      };
      const isSend = await emailService.sendEmail(options); 
      expect( isSend ).toBeFalsy();
   });

   test( 'should send email with attachments', async () => {
      const email =  'javikogutierrez64@gmail.com';
      await emailService.sendEmailWithFileSystemLogs( email );
      expect( mockSendMail ).toHaveBeenCalledWith({
         attachments: expect.arrayContaining([
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
         ]),
         "html": expect.any( String ),
         subject: "Logs server",
         to: email,
      });
   });
});
import { CheckService } from '../domain/use-cases/checks/checks-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository =  new LogRepositoryImpl(
   new FileSystemDataSource()
);

export class Server {
   constructor() {
   }

   public static start(){
      console.log('<--------------- JK Server --------------->');
      console.log('Server started');
      const emailService = new EmailService();
      // emailService.sendEmail({
      //    to: 'javikogutierrez64@gmail.com',
      //    subject: 'Logs system',
      //    htmlBody: `
      //       <h3>Logs system</h3>
      //       <p>test</p>
      //       <p>test 2-1</p>
      //    `
      // });
      // emailService.sendEmailWithFileSystemLogs(['javikogutierrez64@gmail.com', 'javigutierrez64@hotmail.es']);
      CronService.createJob( 
         '*/5 * * * * *',  
         () => {
            const url = 'https://google.com';
            new CheckService(
               fileSystemLogRepository,
               () => console.log(`success url: ${url}`),
               (error) => console.log(error),
            ).execute( url );
            // new CheckService().execute('http://localhost:3000');
         }
      );
   }
}
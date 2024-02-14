import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/checks-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/checks-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const logRepository =  new LogRepositoryImpl(
   // new FileSystemDataSource()
   // new MongoLogDataSource()
   new PostgresLogDataSource()
);

const logFileSystemRepository =  new LogRepositoryImpl(
   new FileSystemDataSource()
);
const logMongoRepository =  new LogRepositoryImpl(
   new MongoLogDataSource()
);
const logPostgresRepository =  new LogRepositoryImpl(
   new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {
   constructor() {
   }

   public static async start(){
      console.log('<--------------- JK Server --------------->');
      console.log('Server started');

      // new SendEmailLogs(
      //    emailService,
      //    fileSystemLogRepository
      // ).execute(
      //    ['javikogutierrez64@gmail.com', 'javigutierrez64@hotmail.es']
      // )
      // const emailService = new EmailService( fileSystemLogRepository );
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
               // fileSystemLogRepository,
               // mongoDbRepository,
               logRepository,
               () => console.log(`success url: ${url}`),
               (error) => console.log(error),
            ).execute( url );
            // new CheckService().execute('http://localhost:3000');
         }
      );

      // CronService.createJob( 
      //    '*/5 * * * * *',  
      //    () => {
      //       const url = 'https://google_test.com';
      //       new CheckServiceMultiple(
      //          // fileSystemLogRepository,
      //          // mongoDbRepository,
      //          [ logFileSystemRepository, logMongoRepository, logPostgresRepository ],
      //          () => console.log(`success url: ${url}`),
      //          (error) => console.log(error),
      //       ).execute( url );
      //       // new CheckService().execute('http://localhost:3000');
      //    }
      // );
   }
}
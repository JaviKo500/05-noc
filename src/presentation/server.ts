import { CheckService } from '../domain/use-cases/checks/checks-service';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository =  new LogRepositoryImpl(
   new FileSystemDataSource
);

export class Server {
   constructor() {
   }

   public static start(){
      console.log('<--------------- JK Server --------------->');
      console.log('Server started');
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
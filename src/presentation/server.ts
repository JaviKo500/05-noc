import { CronService } from './cron/cron-service';

export class Server {
   constructor() {
   }

   public static start(){
      console.log('<--------------- JK Server --------------->');
      console.log('Server started');
      CronService.createJob( 
         '*/5 * * * * *',  
         () => {
            const date = new Date();
            console.log('<--------------- JK Server --------------->');
            console.log('5 seconds', date);
         }
      );
   }
}
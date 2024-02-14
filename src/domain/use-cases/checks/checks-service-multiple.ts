import { LogEntity, LogEntityOptions, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckServiceMultipleUseCase {
   execute( url: string  ): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;  
export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
   constructor(
      private readonly logRepository: LogRepository [],
      private readonly successCallback: SuccessCallback,
      private readonly errorCallback: ErrorCallback,
   ) {
   }

   private callLogsRepositories( log: LogEntity ) {
      this.logRepository.forEach( logRepository => {
        logRepository.saveLog( log ); 
      });
   }

   execute = async ( url: string ): Promise< boolean > => {
      try {
         const req = await fetch( url );  
         if ( !req.ok ) {
            throw new Error(`Error on check service ${ url }` );
         }
         const options: LogEntityOptions = {
            level: LogSeverityLevel.low,
            message: `Service ${url}`,
            origin: 'checks-service.ts'
         }
         const log = new LogEntity( options);
         await this.callLogsRepositories( log );
         this.successCallback && this.successCallback();
         return true;
      } catch (error) {
         const errorMessage = `Url: ${url} in not ok, ${error}`;
         const options: LogEntityOptions = {
            level: LogSeverityLevel.high,
            message: errorMessage,
            origin: 'checks-service.ts'
         }

         const log = new LogEntity( options );
         await this.callLogsRepositories( log );
         this.errorCallback && this.errorCallback( errorMessage );
         return false;
      }
   }
}
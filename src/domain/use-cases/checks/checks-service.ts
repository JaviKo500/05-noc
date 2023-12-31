import { LogEntity, LogEntityOptions, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckServiceUseCase {
   execute( url: string  ): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;  
export class CheckService implements CheckServiceUseCase {
   constructor(
      private readonly logRepository: LogRepository,
      private readonly successCallback: SuccessCallback,
      private readonly errorCallback: ErrorCallback,
   ) {
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
         await this.logRepository.saveLog( log );
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
         await this.logRepository.saveLog( log );
         this.errorCallback && this.errorCallback( errorMessage );
         return false;
      }
   }
}
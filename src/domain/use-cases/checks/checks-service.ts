import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

export interface CheckServiceUseCase {
   execute( url: string  ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = ( error: string ) => void;
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
         const log = new LogEntity( LogSeverityLevel.low, `Service ${url}` );
         await this.logRepository.saveLog( log );
         this.successCallback();
         return true;
      } catch (error) {
         const errorMessage = `Url: ${url} in not ok, ${error}`
         const log = new LogEntity( LogSeverityLevel.high, errorMessage );
         await this.logRepository.saveLog( log );
         this.errorCallback( errorMessage );
         return false;
      }
   }
}
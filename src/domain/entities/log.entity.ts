import { SeverityLevel } from "@prisma/client";

export enum LogSeverityLevel {
   low = 'low',
   medium = 'medium',
   high = 'high',
} 

export interface LogEntityOptions {
   level: LogSeverityLevel;
   message: string;
   createdAt?: Date;
   origin: string;
}
export class LogEntity {
   public level: LogSeverityLevel;
   public message: string;
   public createdAt: Date;
   public origin: string;
   constructor(
      options: LogEntityOptions
   ) {
      const { level, message, createdAt: createAt= new Date(), origin } = options;
      this.level = level;
      this.message = message;
      this.createdAt = createAt;
      this.origin = origin;
   }

   static fromJson  = ( json: string ): LogEntity => {
      json = json === '' ? '{}': json;
      const { message, level, createdAt, origin } =  JSON.parse(json);

      // if ( !message ) throw new Error('Message is required');
      // if ( !level ) throw new Error('Level is required');

      const log = new LogEntity({level, message, createdAt, origin});
      log.createdAt = new Date( createdAt );
      return log;
   }

   static fromObject = ( obj: { [key: string]: any } ): LogEntity => {
      const { message, level, createdAt, origin } = obj;
      if ( !message ) throw new Error('Message is required');
      const log = new LogEntity({level, message, createdAt, origin});
      return log;
   }
}
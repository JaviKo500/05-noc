export enum LogSeverityLevel {
   low = 'low',
   medium = 'medium',
   high = 'high',
} 

export class LogEntity {
   public level: LogSeverityLevel;
   public message: string;
   public createAt: Date;
   constructor(
      level: LogSeverityLevel,
      message: string,
   ) {
      this.level = level;
      this.message = message;
      this.createAt = new Date();
   }

   static fromJson  = ( json: string ): LogEntity => {
      const { message, level, createdAt } =  JSON.parse(json);
      if ( !message ) throw new Error('Message is required');
      if ( !level ) throw new Error('Level is required');

      const log = new LogEntity(level, message);
      log.createAt = new Date( createdAt );
      return log;
   }

}
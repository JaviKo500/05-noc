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

}
import { LogModel } from "../../data/mongoDB";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDataSource {
   async saveLog(log: LogEntity): Promise<void> {
      const newLog = await LogModel.create(log);
      
      console.log('<--------------- JK Mongo-log.datasource --------------->');
      console.log(`Mongo log saved ${newLog.id}`);
   }
   async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      const newLogs = await LogModel.find({
         level: severityLevel
      });
      // return newLogs.map( mongoLog => LogEntity.fromObject(mongoLog) );
      return newLogs.map( LogEntity.fromObject );
   }
}
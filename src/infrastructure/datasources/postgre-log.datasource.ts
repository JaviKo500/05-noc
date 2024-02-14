import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient =  new PrismaClient();
const severityEnum = {
   low: SeverityLevel.LOW,
   medium: SeverityLevel.MEDIUM,
   high: SeverityLevel.HIGH,
}

export class PostgresLogDataSource implements LogDataSource {
   async saveLog(log: LogEntity): Promise<void> {
      const newLog = await prismaClient.logModelNoc.create({
         data: {
            level: severityEnum[log.level],
            message: log.message,
            origin: log.origin,
            createdAt: log.createdAt,
         }
      });

      console.log('<--------------- JK Postgres-log.datasource --------------->');
      console.log(newLog.id);
   }
   async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      const logs = await prismaClient.logModelNoc.findMany({
         where: {
            level: severityEnum[severityLevel]
         }
      })
      console.log('<--------------- JK Postgres-log.datasource --------------->');
      console.log(logs.length);

      return logs.map ( LogEntity.fromObject );
   }
}
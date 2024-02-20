import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugins";
import { LogModel, MongoDataBase } from "../../data/mongoDB";
import { MongoLogDataSource } from "./mongo-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe('Mongo-log.datasource.test', () => {

   const logDataSource  = new MongoLogDataSource();
   
   beforeAll( async () => {
      await MongoDataBase.connect({
         dbName: envs.MONGO_DB_NAME,
         mongoUrl: envs.MONGO_URL
      });
   });

   const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: 'test message',
      origin: 'mongo-log.datasource.test.ts'
   })
   afterAll( async () => {
      await LogModel.deleteMany();
      return mongoose.connection.close();
   });

   test( 'should create a log', async () => {
      
      const logSpy = jest.spyOn(console, 'log'); 

      await logDataSource.saveLog(log);

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toHaveBeenCalledWith('Mongo log saved', expect.any(String));
   });

   test( 'should get logs', async () => {
      await logDataSource.saveLog( log )
      await logDataSource.saveLog( log )
      const logs = await logDataSource.getLogs( LogSeverityLevel.medium );
      
      expect( logs.length ).toBe(3);
      expect( logs[0].level ).toBe(LogSeverityLevel.medium);
   });
});
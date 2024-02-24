import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('Log.repository.impl.test', () => {
   const mockRepository: LogRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
   }; 

   const newLog = new LogEntity({
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'Log.datasource.test',
   });

   const logRepositoryImpl = new LogRepositoryImpl( mockRepository )

   beforeEach(() => jest.clearAllMocks());
   test( 'saveLog should call the datasource with arguments ', async () => {
      await logRepositoryImpl.saveLog( newLog );   
      expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
   });
   test( 'getLogs should call the datasource with arguments ', async () => {
      await logRepositoryImpl.getLogs( LogSeverityLevel.low );
      expect( mockRepository.getLogs ).toHaveBeenCalledWith( expect.stringContaining( 'low' ) );
      
   });
});
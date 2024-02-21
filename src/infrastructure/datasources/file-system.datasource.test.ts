import path from 'path';
import fs from 'fs';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('File-system.datasource.test', () => {

   const logPath = path.join(__dirname, '../../../logs');

   beforeEach(() => {
      fs.rmSync( logPath, { recursive: true, force: true });
   });
   test( 'should create log file if they do not exists', () => {
      new FileSystemDataSource();
      const files = fs.readdirSync(logPath);
      expect( files ).toEqual( [ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ]);
   });

   test( 'should save a log in logs-all.log', () => {
      const logDataSource = new FileSystemDataSource();
      const log = new LogEntity({
         level: LogSeverityLevel.low,
         message: 'test message',
         origin: 'File-system.datasource.test'
      });

      logDataSource.saveLog( log );

      const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');

      expect( allLogs ).toContain( JSON.stringify(log) );
   });

   test( 'should save a log in logs-all.log and logs-medium.log medium', () => {
      const logDataSource = new FileSystemDataSource();
      const log = new LogEntity({
         level: LogSeverityLevel.medium,
         message: 'test message',
         origin: 'File-system.datasource.test'
      });

      logDataSource.saveLog( log );

      const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
      const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

      expect( allLogs ).toContain( JSON.stringify(log) );
      expect( mediumLogs ).toContain( JSON.stringify(log) );
   });

   test( 'should save a log in logs-all.log and logs-high.log high', () => {
      const logDataSource = new FileSystemDataSource();
      const log = new LogEntity({
         level: LogSeverityLevel.high,
         message: 'test message',
         origin: 'File-system.datasource.test'
      });

      logDataSource.saveLog( log );

      const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
      const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');

      expect( allLogs ).toContain( JSON.stringify(log) );
      expect( highLogs ).toContain( JSON.stringify(log) );
   });

   test( 'should return all logs', async () => {
      const logDataSource = new FileSystemDataSource();
      const logLow = new LogEntity({
         level: LogSeverityLevel.low,
         message: 'test message',
         origin: 'File-system.datasource.test'
      });
      const logMedium = new LogEntity({
         level: LogSeverityLevel.medium,
         message: 'test message',
         origin: 'File-system.datasource.test'
      });
      const logHigh = new LogEntity({
         level: LogSeverityLevel.high,
         message: 'test message',
         origin: 'File-system.datasource.test'
      });

      await logDataSource.saveLog( logLow );
      await logDataSource.saveLog( logMedium );
      await logDataSource.saveLog( logHigh );

      const logsLow = await logDataSource.getLogs( LogSeverityLevel.low );
      const logsMedium = await logDataSource.getLogs( LogSeverityLevel.medium );
      const logsHigh = await logDataSource.getLogs( LogSeverityLevel.high );

      expect( logsLow ).toEqual( expect.arrayContaining( [logLow, logMedium, logHigh] ) );
      expect( logsMedium ).toEqual( expect.arrayContaining( [ logMedium ] ) );
      expect( logsHigh ).toEqual( expect.arrayContaining( [logHigh] ) );

   });

   test( 'should not throw an error if path exist', () => {
      new FileSystemDataSource();
      new FileSystemDataSource();

      expect( true ).toBeTruthy();
   });

   test( 'should throw an error if severity level not defines', async  () => {
      const logDataSource = new FileSystemDataSource();
      const logLow = new LogEntity({
         level: LogSeverityLevel.low,
         message: 'test message',
         origin: 'File-system.datasource.test'
      });

      
      try {
         const logsLow = await logDataSource.getLogs( 'SUPER_MEGA_HIGH' as LogSeverityLevel );
         expect( true ).toBeFalsy();
      } catch (error: any) {
         expect( error?.message ).toContain('SUPER_MEGA_HIGH not implemented');
      }
   });

   test( 'should return if content in file logs is empty', async () => {
      const logDataSource = new FileSystemDataSource();

      const logsLow = await logDataSource.getLogs( LogSeverityLevel.low );
      const logsMedium = await logDataSource.getLogs( LogSeverityLevel.medium );
      const logsHigh = await logDataSource.getLogs( LogSeverityLevel.high );

      expect( logsLow ).toEqual( expect.arrayContaining( [] ) );
      expect( logsMedium ).toEqual( expect.arrayContaining( [] ) );
      expect( logsHigh ).toEqual( expect.arrayContaining( [] ) );
   });
});
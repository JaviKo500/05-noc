import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('Log.entity.test', () => {
   const dataObj = {
      level: LogSeverityLevel.low,
      message: 'test message',
      origin: 'Log.datasource.test',
   };
   test( 'should create a log entity instance', () => {
      

      const log = new LogEntity(dataObj);

      expect( log ).toBeInstanceOf( LogEntity );
      expect( log.message ).toBe( dataObj.message );
      expect( log.level ).toBe( dataObj.level );
      expect( log.origin ).toBe( dataObj.origin );
      expect( log.createdAt ).toBeInstanceOf( Date );
      // expect( log ).toBeInstanceOf( LogEntity );
   });

   test( 'should create a log entity instance from json', () => {
      const jsonString = `{"level":"high","message":"Url: https://google_test.com in not ok, TypeError: fetch failed","createdAt":"2024-02-14T19:18:09.213Z","origin":"checks-service.ts"}`;
      const log  = LogEntity.fromJson(jsonString);

      expect( log ).toBeInstanceOf( LogEntity );
      expect( log.message ).toBe( 'Url: https://google_test.com in not ok, TypeError: fetch failed' );
      expect( log.level ).toBe( LogSeverityLevel.high );
      expect( log.origin ).toBe( 'checks-service.ts' );
      expect( log.createdAt ).toBeInstanceOf( Date );
   });


   test( 'should create log entity instance from object', () => {
      const log = LogEntity.fromObject(dataObj);

      expect( log ).toBeInstanceOf( LogEntity );
      expect( log.message ).toBe( dataObj.message );
      expect( log.level ).toBe( dataObj.level );
      expect( log.origin ).toBe( dataObj.origin );
      expect( log.createdAt ).toBeInstanceOf( Date );
   });
});
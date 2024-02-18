import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./checks-service-multiple";

describe('Checks-service-multiple.test', () => {
   
   const mockRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
   };
   const mockRepositoryMongo = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
   };

   const mockRepositoryPostgres = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
   };

   const successCallback = jest.fn();
   const errorCallback = jest.fn();
   const checkServiceMultiple  = new CheckServiceMultiple(
      [mockRepository, mockRepositoryMongo, mockRepositoryPostgres],
      successCallback,
      errorCallback,
   );

   beforeEach(() => {
      jest.clearAllMocks();
   });


   test( 'should call successCallback when fetch returns true', async () => {
      
      const wasOk = await checkServiceMultiple.execute('https://google.com');
      
      expect(wasOk).toBe(true);

      expect( successCallback ).toHaveBeenCalled();
      expect( errorCallback ).not.toHaveBeenCalled();

      expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
      expect( mockRepositoryMongo.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
      expect( mockRepositoryPostgres.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
   });

   test( 'should call errorCallback when fetch returns false', async () => {
      
      const wasOk = await checkServiceMultiple.execute('https://google.com.test.test');
      
      expect(wasOk).toBe(false);

      expect( successCallback ).not.toHaveBeenCalled();
      expect( errorCallback ).toHaveBeenCalled();

      expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
      expect( mockRepositoryMongo.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
      expect( mockRepositoryPostgres.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
   });
});
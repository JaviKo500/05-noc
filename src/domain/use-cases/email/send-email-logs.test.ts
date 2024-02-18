import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe('Send-email-logs.test', () => {

   const mockEmailService: any  = {
      sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
   };

   const mockRepository: LogRepository = {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
   };   

   const sendEmailLogs = new SendEmailLogs( 
      mockEmailService, 
      mockRepository,
   );

   beforeEach(() => jest.clearAllMocks() );
   test( 'should call sendEmail and saveLog', async () => {

      const result = await sendEmailLogs.execute('javikogutierrez64@gmail.com');

      expect( result ).toBe( true );

      expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
      expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
      expect( mockRepository.saveLog ).toHaveBeenCalledWith({
         createdAt: expect.any(Date), 
         level: 'low', 
         message: 'Email sent', 
         origin: 'send-email-logs.ts'
      });
   });

   test( 'should log in case error', async () => {

      mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue( false );
      const result = await sendEmailLogs.execute('javikogutierrez64@gmail.com');

      expect( result ).toBe( false );

      expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
      expect( mockRepository.saveLog ).toHaveBeenCalledWith( expect.any(LogEntity) );
      expect( mockRepository.saveLog ).toHaveBeenCalledWith({
         createdAt: expect.any(Date), 
         level: 'high', 
         message: 'Error: Email log not sent', 
         origin: 'send-email-logs.ts'
      });
   });
});
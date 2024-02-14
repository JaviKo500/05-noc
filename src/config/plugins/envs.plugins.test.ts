import { envs } from "./envs.plugins";

describe('Envs.plugins.test', () => {
   test( 'should return env options', () => {
      expect( envs ).toEqual({
         PORT: 3000,
         MAILER_SERVICE: 'gmail',
         MAILER_EMAIL: 'javikogutierrez64@gmail.com',
         MAILER_SECRET_KEY: 'twgkykassmznvlux',
         MONGO_URL: 'mongodb://javier500:test1234@localhost:27018',        
         MONGO_DB_NAME: 'noc-mongo-test',
         MONGO_USER: 'javier500',
         MONGO_PASS: 'test12345',
      })
   });

   test( 'should return error if not found env', async () => {
      jest.resetModules();
      process.env.PORT = 'ABC';
      try {
         await import('./envs.plugins');
         expect(true).toBe(false);
      } catch (error: any) {
         expect(`${error}`).toContain('"PORT" should be a valid integer');
      }
   });
});
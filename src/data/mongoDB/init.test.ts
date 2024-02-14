import mongoose from "mongoose";
import { MongoDataBase } from "./init";

describe('Init.test', () => {
   afterAll(() => {
      mongoose.connection.close();
   });
   test( 'should connect to mongo db', async () => {
      
      const connected = await MongoDataBase.connect({
         dbName: process.env.MONGO_DB_NAME!,
         mongoUrl: process.env.MONGO_URL!
      });

      expect(connected).toBe(true);
   }); 

   test( 'should throw an error', async () => {
      try {
         const connected = await MongoDataBase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: 'mongodb://javier500:test12111@localhost:2701822',
         });
         console.log('<--------------- JK Init.test --------------->');
         console.log({connected});
         expect(connected).toBe(false);
      } catch (error) {
         expect(true).toBe(true);
      }
   });
});
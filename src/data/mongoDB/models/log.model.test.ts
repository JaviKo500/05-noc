import mongoose from "mongoose";
import { envs } from "../../../config/plugins/envs.plugins";
import { MongoDataBase } from "../init";
import { LogModel } from "./log.model";

describe('Log.model.test', () => {

   beforeAll( async () => {
      await MongoDataBase.connect({
         mongoUrl: envs.MONGO_URL,
         dbName: envs.MONGO_DB_NAME
      });
   });

   afterAll( async () =>{
      mongoose.connection.close();
   });

   test( 'should return LogModel', async () => {
      const logData = {
         origin: 'Log.model.test',
         message: 'test message',
         level: 'low'
      }

      const log = await LogModel.create(logData);

      expect(log).toEqual( expect.objectContaining({
         ...log,
         createdAt: expect.any(Date), 
         id: expect.any(String)
      }) );

      await LogModel.findByIdAndDelete(log.id);
   });

   test( 'should return the schema object', () => {
      const schema = LogModel.schema.obj;

      expect( schema ).toEqual( expect.objectContaining({
         message: { type: expect.any(Function), require: true },
         origin: { type: expect.any(Function) },
         level: {
           type: expect.any(Function),
           enum: [ 'low', 'medium', 'high' ],
           default: 'low'
         },
         createdAt: expect.any(Object),
      }));
   });

});
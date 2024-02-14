import mongoose from 'mongoose';

interface ConnectionOptions {
   mongoUrl: string;
   dbName: string;
}

export class MongoDataBase {
   static async connect( options: ConnectionOptions ){
      const { dbName, mongoUrl } = options;
      try {
         await mongoose.connect( mongoUrl, {
            dbName,
         });
         return true;
      } catch (error) {
         throw error;
      }
   }
}
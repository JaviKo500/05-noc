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
         console.log('<--------------- JK Init --------------->');
         console.log('mongo connection established');
      } catch (error) {
         console.log('<--------------- JK Init error--------------->');
         console.log(error);
         throw error;
      }
   }
}
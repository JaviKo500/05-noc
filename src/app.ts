import { envs } from './config/plugins/envs.plugins';
import {MongoDataBase } from './data/mongoDB';
import { Server } from './presentation/server';
import { PrismaClient } from '@prisma/client';

(async () => {
   await main();
})();
async function main() {
   await MongoDataBase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
   });
}
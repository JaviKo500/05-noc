import { envs } from './config/plugins/envs.plugins';
import { LogModel, MongoDataBase } from './data/mongoDB';
import { Server } from './presentation/server';

(async () => {
   await main();
})();
async function main() {
   await MongoDataBase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
   })

   await Server.start();
   // console.log('<--------------- JK App --------------->');
   // console.log(envs);
}
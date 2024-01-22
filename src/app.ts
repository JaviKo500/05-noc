import { envs } from './config/plugins/envs.plugins';
import { MongoDataBase } from './data/mongo';
import { Server } from './presentation/server';

(async () => {
   await main();
})();
async function main() {
   await MongoDataBase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_URL,
   })
   await Server.start();
   // console.log('<--------------- JK App --------------->');
   // console.log(envs);
}
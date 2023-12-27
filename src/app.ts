import { envs } from './config/plugins/envs.plugins';
import { Server } from './presentation/server';

(async () => {
   await main();
})();
async function main() {
   await Server.start();
   // console.log('<--------------- JK App --------------->');
   // console.log(envs);
}
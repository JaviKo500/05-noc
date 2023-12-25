import { Server } from "./presentation/server";

(async () => {
   await main();
})();
async function main() {
   await Server.start();
}
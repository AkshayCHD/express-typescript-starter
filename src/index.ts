import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "./../.env") });
import App from "./providers/App";
import Locals from "./providers/Locals";
/**
 * Run the Database pool
 */
console.log(Locals.config());
App.loadDatabase(Locals.config().mongooseUrl);



/**
 * Run the Server on Clusters
 */
App.loadServer();

import {setupServer } from "./server.js"
import {initMongoConnection} from './db/initMongoConnection.js';

const bootsrap = async () => {
await initMongoConnection();
setupServer();
}



bootsrap();
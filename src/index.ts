import { createConnection } from "typeorm";
import { initServer } from "./server";


async function createConnectio() {
    await createConnection();

    console.log('Create connection');
    
}


createConnectio();
initServer();
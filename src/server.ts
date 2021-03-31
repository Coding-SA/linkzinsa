import { NestFactory } from "@nestjs/core";
import { ApiModule } from "./api.module";



export async function initServer() {
    const api = await NestFactory.create(ApiModule);

    api.listen(3000);

    console.info('Running in port 3000')
    
}
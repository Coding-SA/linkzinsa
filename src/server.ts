import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ApiModule } from "./api.module";



export async function initServer() {
    const api = await NestFactory.create(ApiModule,);
    
    api.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
    .setTitle('Linkzin SA')
    .setDescription('')
    .setVersion('1.0')
    .build();

    const document = SwaggerModule.createDocument(api, config);

    SwaggerModule.setup('docs', api, document);

    api.listen(3000);

    console.info('Running in port 3000')
    
}
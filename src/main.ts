import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap () {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api");
    
    const documentBuilderConfig = new DocumentBuilder()
    .setTitle("Medium Clone")
    .setDescription("The Medium Clone API Specifications")
    .setVersion("1.0")
    .addTag("Medium")
    .addBearerAuth()
    .build();
    
    const documentOptions: SwaggerDocumentOptions = {
        operationIdFactory: (
            controllerKey: string,
            methodKey: string
        ) => methodKey
    };
    
    const document = SwaggerModule.createDocument(app, documentBuilderConfig, documentOptions);
    SwaggerModule.setup("api", app, document);
    
    await app.listen(3000, "0.0.0.0");
    Logger.log(`Application is running on ${await app.getUrl()}`);
}

void bootstrap();

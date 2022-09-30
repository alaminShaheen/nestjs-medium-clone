import { BadRequestException, Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormConfig } from "./configs/typeorm.config";
import { APP_PIPE } from "@nestjs/core";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConstantsModule } from "./constants/constants.module";
import { ErrorMessagesModule } from "./error-messages/error-messages.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRootAsync(TypeormConfig),
        UsersModule,
        AuthModule,
        ConstantsModule,
        ErrorMessagesModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
                validationError: { value: false, target: false },
                exceptionFactory: (errors) => new BadRequestException(errors, "Validation errors")
            })
        }
    ]
})
export class AppModule {
}

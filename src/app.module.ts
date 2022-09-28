import { BadRequestException, Logger, MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeormConfig } from "./configs/typeorm.config";
import { APP_PIPE } from "@nestjs/core";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.env.NODE_ENV}.env`
        }),
        TypeOrmModule.forRootAsync(TypeormConfig),
        UsersModule,
        AuthModule
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
    private readonly logger = new Logger(AppModule.name);
    
    constructor (private readonly configService: ConfigService) {
    }
    
    configure (consumer: MiddlewareConsumer) {
        // this.logger.log(`${AppModule.name} middlewares initialized`);
        // consumer
        // .apply(
        //     session({
        //         name: "medium_api_session",
        //         secret: this.configService.get<string>("SESSION_SECRET"),
        //         resave: false,
        //         saveUninitialized: false,
        //         cookie: {
        //             maxAge: 2 * 60 * 1000
        //         }
        //     }))
        // .forRoutes("*")
        // .apply(passport.initialize())
        // .forRoutes("*")
        // .apply(passport.session())
        // .forRoutes("*");
    }
}

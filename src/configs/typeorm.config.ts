import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

export const TypeormConfig: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
            type: "postgres",
            database: configService.get<string>("DB_NAME"),
            host: configService.get<string>("DB_HOST"),
            port: configService.get<number>("DB_PORT"),
            entities: ["dist/**/*.entity.js"],
            synchronize: configService.get<boolean>("DB_SYNCHRONIZE"),
            username: configService.get<string>("DB_USER"),
            password: configService.get<string>("DB_PASSWORD")
        };
    }
};

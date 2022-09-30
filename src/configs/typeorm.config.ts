import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DatabaseConstantsService } from "../constants/database-constants.service";
import { ConstantsModule } from "../constants/constants.module";

export const TypeormConfig: TypeOrmModuleAsyncOptions = {
    inject: [DatabaseConstantsService],
    imports: [ConstantsModule],
    useFactory: async (databaseConstantsService: DatabaseConstantsService): Promise<TypeOrmModuleOptions> => {
        return {
            type: "postgres",
            database: databaseConstantsService.DB_NAME,
            // host: databaseConstantsService.DB_HOST,
            port: databaseConstantsService.DB_PORT,
            entities: ["dist/**/*.entity.js"],
            synchronize: databaseConstantsService.DB_SYNCHRONIZE,
            username: databaseConstantsService.DB_USER,
            password: databaseConstantsService.DB_PASSWORD
        };
    }
};

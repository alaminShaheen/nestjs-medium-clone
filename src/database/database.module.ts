import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DatabaseConstantsService } from "./database-constants.service";
import { DatabaseSeederService } from "./database-seeder.service";
import { AppMessagesModule } from "../app-messages/app-messages.module";
import { ConsoleModule } from "nestjs-console";
import { UsersModule } from "../users/users.module";
import { UserEntity } from "../users/user.entity";
import { ArticleEntity } from "../articles/article.entity";
import { FollowEntity } from "../follows/follow.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [DatabaseConstantsService],
            imports: [DatabaseModule, UsersModule],
            useFactory: async (databaseConstantsService: DatabaseConstantsService): Promise<TypeOrmModuleOptions> => {
                return {
                    type: "postgres",
                    database: databaseConstantsService.DB_NAME,
                    host: databaseConstantsService.DB_HOST,
                    port: databaseConstantsService.DB_PORT,
                    entities: [UserEntity, ArticleEntity, FollowEntity],
                    synchronize: databaseConstantsService.DB_SYNCHRONIZE,
                    username: databaseConstantsService.DB_USER,
                    password: databaseConstantsService.DB_PASSWORD
                };
            }
        }),
        AppMessagesModule,
        ConsoleModule
    ],
    providers: [DatabaseConstantsService, DatabaseSeederService],
    exports: [DatabaseConstantsService]
})
export class DatabaseModule {
}

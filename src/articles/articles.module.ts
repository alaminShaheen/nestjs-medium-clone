import { Module } from "@nestjs/common";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { AppMessagesModule } from "../app-messages/app-messages.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./article.entity";
import { UsersModule } from "../users/users.module";
import { ConstantsModule } from "../constants/constants.module";

@Module({
    imports: [
        AppMessagesModule,
        TypeOrmModule.forFeature([ArticleEntity]),
        UsersModule,
        ConstantsModule
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService]
})
export class ArticlesModule {
}

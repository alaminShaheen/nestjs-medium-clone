import { Module } from "@nestjs/common";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { AppMessagesModule } from "../app-messages/app-messages.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./article.entity";

@Module({
    imports: [AppMessagesModule, TypeOrmModule.forFeature([ArticleEntity])],
    controllers: [ArticlesController],
    providers: [ArticlesService]
})
export class ArticlesModule {
}

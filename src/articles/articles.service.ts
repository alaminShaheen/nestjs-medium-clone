import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { ArticleListQueryParamsDto } from "./dtos/article-list-query-params.dto";
import { UsersService } from "../users/users.service";
import { ArticleEntity } from "./article.entity";
import { AppErrorMessagesService } from "../app-messages/app-error-messages.service";
import { AppConstantsService } from "../constants/app-constants.service";

@Injectable()
export class ArticlesService {
    private logger = new Logger(ArticlesService.name);
    
    constructor (
        @InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>,
        private readonly usersService: UsersService,
        private readonly appErrorMessagesService: AppErrorMessagesService,
        private readonly appConstantsService: AppConstantsService
    ) {
    }
    
    async getArticleList (queries: ArticleListQueryParamsDto) {
        const whereCondition: FindOptionsWhere<ArticleEntity> =
            queries.authorId ? { authorId: queries.authorId } : undefined;
        
        try {
            return await this.articleRepository.find({
                where: whereCondition,
                order: { createdAt: "DESC" },
                take: queries.limit || this.appConstantsService.ARTICLE_LIST_DEFAULT_LIMIT,
                skip: queries.offset || 0
            });
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(this.appErrorMessagesService.SERVER_ERROR);
        }
    }
}

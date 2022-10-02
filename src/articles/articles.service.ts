import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { ArticleListQueryParamsDto } from "./dtos/article-list-query-params.dto";
import { UsersService } from "../users/users.service";
import { ArticleEntity } from "./article.entity";
import { AppErrorMessagesService } from "../app-messages/app-error-messages.service";
import { AppConstantsService } from "../constants/app-constants.service";
import { Pagination } from "../shared/pagination/Pagination";

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
    
    async getArticleList (
        queries: ArticleListQueryParamsDto
    ): Promise<Pagination<ArticleEntity>> {
        
        const whereCondition: FindOptionsWhere<ArticleEntity> =
            queries.authorId ? { authorId: queries.authorId } : undefined;
        const limit = queries.limit || this.appConstantsService.ARTICLE_LIST_DEFAULT_LIMIT;
        const page = queries.page || 0;
        
        try {
            const [data, total] = await this.articleRepository.findAndCount({
                where: whereCondition,
                order: { createdAt: "DESC" },
                take: limit,
                skip: page * limit
            });
            return new Pagination<ArticleEntity>({
                total,
                results: data,
                hasMore: (page * limit + data.length) < total
            });
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(this.appErrorMessagesService.SERVER_ERROR);
        }
    }
}

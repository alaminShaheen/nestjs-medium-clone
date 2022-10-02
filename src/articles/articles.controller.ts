import { Controller, Get, HttpCode, HttpStatus, Logger, Query, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { DocumentationMessagesService } from "../app-messages/documentation-messages.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ArticleListQueryParamsDto } from "./dtos/article-list-query-params.dto";
import { ArticlesService } from "./articles.service";
import { ArticleDto } from "./dtos/article.dto";
import { ArticleEntity } from "./article.entity";
import { SerializeTo } from "../common/interceptors/serialize.interceptor";

@Controller("articles")
@UseGuards(JwtAuthGuard)
@SerializeTo(ArticleDto)
@ApiTags("Articles")
export class ArticlesController {
    private readonly logger = new Logger(ArticlesController.name);
    
    constructor (private readonly articlesService: ArticlesService) {
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: DocumentationMessagesService.FETCH_ARTICLES, type: ArticleDto })
    @ApiBadRequestResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    async getArticleList (@Query() queries: ArticleListQueryParamsDto): Promise<ArticleEntity[]> {
        this.logger.log("Fetching articles");
        return this.articlesService.getArticleList(queries);
    }
}

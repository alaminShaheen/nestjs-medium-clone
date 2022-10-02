import { Controller, Get, HttpCode, HttpStatus, Logger, Query, UseGuards } from "@nestjs/common";
import { ApiBadRequestResponse, ApiTags } from "@nestjs/swagger";
import { DocumentationMessagesService } from "../app-messages/documentation-messages.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ArticleListQueryParamsDto } from "./dtos/article-list-query-params.dto";
import { ArticlesService } from "./articles.service";
import { ArticleDto } from "./dtos/article.dto";
import { ArticleEntity } from "./article.entity";
import { Pagination } from "../shared/pagination/Pagination";
import { ApiPaginatedResponse } from "../common/decorators/api-paginated-response.decorator";

@Controller("articles")
@UseGuards(JwtAuthGuard)
@ApiTags("Articles")
export class ArticlesController {
    private readonly logger = new Logger(ArticlesController.name);
    
    constructor (private readonly articlesService: ArticlesService) {
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiPaginatedResponse(ArticleDto)
    @ApiBadRequestResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    async getArticleList (
        @Query() queries: ArticleListQueryParamsDto
    ): Promise<Pagination<ArticleEntity>> {
        this.logger.log("Fetching articles");
        return this.articlesService.getArticleList(queries);
    }
}

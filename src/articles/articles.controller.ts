import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { Request } from "express";
import { DocumentationMessagesService } from "../app-messages/documentation-messages.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ArticleListQueryParamsDto } from "./dtos/article-list-query-params.dto";
import { ArticlesService } from "./articles.service";
import { ArticleResponseDto } from "./dtos/article-response.dto";
import { ArticleEntity } from "./article.entity";
import { Pagination } from "../shared/pagination/Pagination";
import { ApiPaginatedOkResponse } from "../common/decorators/api-paginated-response.decorator";
import { PaginationOptionsDto } from "../common/dtos/pagination-options.dto";
import { ArticleRequestDto } from "./dtos/article-request.dto";
import { CurrentUserInterceptor } from "../common/interceptors/current-user.interceptor";
import { UserResponseDto } from "../users/dtos/user-response.dto";
import { ArticleUpdateRequestDto } from "./dtos/article-update-request.dto";

@Controller("articles")
@ApiTags("Articles")
@ApiInternalServerErrorResponse({ description: DocumentationMessagesService.SERVER_ERROR })
export class ArticlesController {
    private readonly logger = new Logger(ArticlesController.name);
    
    constructor (private readonly articlesService: ArticlesService) {
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiPaginatedOkResponse(ArticleResponseDto)
    @ApiBadRequestResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    async getArticleList (
        @Query() queries: ArticleListQueryParamsDto
    ): Promise<Pagination<ArticleEntity>> {
        this.logger.log("Fetching articles");
        return this.articlesService.getArticleList(queries);
    }
    
    @Get("feed")
    @HttpCode(HttpStatus.OK)
    @ApiPaginatedOkResponse(ArticleResponseDto)
    @ApiBadRequestResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    async getFeedArticleList (
        @Query() queries: PaginationOptionsDto
    ): Promise<Pagination<ArticleEntity>> {
        this.logger.log("Fetching feed articles");
        return this.articlesService.getFeedArticleList(queries);
    }
    
    @Get(":slug")
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: DocumentationMessagesService.FETCH_ARTICLE,
        type: ArticleResponseDto
    })
    @ApiBadRequestResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    @ApiBadRequestResponse({ description: DocumentationMessagesService.ARTICLE_NOT_FOUND })
    async getArticle (@Param("slug") slug: string): Promise<ArticleEntity> {
        this.logger.log(`Fetching article with slug: ${slug}`);
        return this.articlesService.getArticle(slug);
    }
    
    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CurrentUserInterceptor)
    @HttpCode(HttpStatus.CREATED)
    @ApiCreatedResponse({
        description: DocumentationMessagesService.CREATE_ARTICLE,
        type: ArticleResponseDto
    })
    @ApiForbiddenResponse({ description: DocumentationMessagesService.FORBIDDEN_RESOURCE })
    async createArticle (
        @Req() request: Request,
        @Body() article: ArticleRequestDto
    ): Promise<ArticleEntity> {
        this.logger.log("Creating new article");
        const { id: userId } = request.user as UserResponseDto;
        return this.articlesService.createArticle(article, userId);
    }
    
    @Put(":slug")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CurrentUserInterceptor)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: DocumentationMessagesService.ARTICLE_UPDATED,
        type: ArticleUpdateRequestDto
    })
    @ApiUnauthorizedResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    @ApiForbiddenResponse({ description: DocumentationMessagesService.FORBIDDEN_RESOURCE })
    @ApiNotFoundResponse({ description: DocumentationMessagesService.ARTICLE_NOT_FOUND })
    async updateArticle (
        @Param("slug") slug: string,
        @Req() request: Request,
        @Body() article: Partial<ArticleUpdateRequestDto>
    ): Promise<ArticleEntity> {
        this.logger.log("Updating new article");
        const { id: userId } = request.user as UserResponseDto;
        return this.articlesService.updateArticle(slug, article, userId);
    }
    
    @Delete(":slug")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CurrentUserInterceptor)
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: DocumentationMessagesService.ARTICLE_DELETED,
        type: ArticleUpdateRequestDto
    })
    @ApiUnauthorizedResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    @ApiForbiddenResponse({ description: DocumentationMessagesService.FORBIDDEN_RESOURCE })
    @ApiNotFoundResponse({ description: DocumentationMessagesService.ARTICLE_NOT_FOUND })
    async deleteArticle (
        @Param("slug") slug: string,
        @Req() request: Request
    ): Promise<void> {
        this.logger.log(`Deleting article with slug: ${slug}`);
        const { id: userId } = request.user as UserResponseDto;
        return this.articlesService.deleteArticle(slug, userId);
    }
}

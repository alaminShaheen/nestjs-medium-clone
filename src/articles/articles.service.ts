import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { ArticleListQueryParamsDto } from "./dtos/article-list-query-params.dto";
import { UsersService } from "../users/users.service";
import { ArticleEntity } from "./article.entity";
import { AppErrorMessagesService } from "../app-messages/app-error-messages.service";
import { AppConstantsService } from "../constants/app-constants.service";
import { Pagination } from "../shared/pagination/Pagination";
import { PaginationOptionsDto } from "../common/dtos/pagination-options.dto";
import { ArticleRequestDto } from "./dtos/article-request.dto";
import { ArticleUpdateRequestDto } from "./dtos/article-update-request.dto";

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
    
    async getFeedArticleList (queries: PaginationOptionsDto): Promise<Pagination<ArticleEntity>> {
        
        const limit = queries.limit || this.appConstantsService.ARTICLE_LIST_DEFAULT_LIMIT;
        const page = queries.page || 0;
        
        try {
            const [data, total] = await this.articleRepository.findAndCount({
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
    
    async getArticle (slug: string): Promise<ArticleEntity> {
        try {
            const article = await this.articleRepository.findOne({
                where: { slug }
            });
            
            if (!article) throw new BadRequestException(this.appErrorMessagesService.RESOURCE_DOES_NOT_EXIST);
            
            return article;
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            else throw new InternalServerErrorException(this.appErrorMessagesService.SERVER_ERROR);
        }
    }
    
    async createArticle (article: ArticleRequestDto, authorId: string): Promise<ArticleEntity> {
        try {
            const newArticle = this.articleRepository.create({ ...article, authorId });
            return this.articleRepository.save(newArticle);
        } catch (error) {
            if (error instanceof BadRequestException) throw error;
            else throw new InternalServerErrorException(this.appErrorMessagesService.SERVER_ERROR);
        }
    }
    
    async updateArticle (
        slug: string,
        requestArticle: Partial<ArticleUpdateRequestDto>,
        requestAuthorId: string
    ): Promise<ArticleEntity> {
        try {
            let articleToUpdate = await this.articleRepository.findOneBy({ slug });
            
            console.log(requestArticle, "hello");
            if (articleToUpdate.authorId !== requestAuthorId) {
                throw new ForbiddenException(this.appErrorMessagesService.FORBIDDEN_RESOURCE);
            } else if (!articleToUpdate) {
                throw new NotFoundException(this.appErrorMessagesService.RESOURCE_DOES_NOT_EXIST);
                
            }
            articleToUpdate = { ...articleToUpdate, ...requestArticle };
            return this.articleRepository.save(articleToUpdate);
        } catch (error) {
            if (
                error instanceof NotFoundException ||
                error instanceof ForbiddenException
            ) throw error;
            else throw new InternalServerErrorException(this.appErrorMessagesService.SERVER_ERROR);
        }
    }
    
    async deleteArticle (slug: string, requestAuthorId: string): Promise<void> {
        try {
            let articleToDelete = await this.articleRepository.findOneBy({ slug });
            
            if (articleToDelete.authorId !== requestAuthorId) {
                throw new ForbiddenException(this.appErrorMessagesService.FORBIDDEN_RESOURCE);
            } else if (!articleToDelete) {
                throw new NotFoundException(this.appErrorMessagesService.RESOURCE_DOES_NOT_EXIST);
                
            }
            
            await this.articleRepository.delete(slug);
            return;
        } catch (error) {
            if (
                error instanceof NotFoundException ||
                error instanceof ForbiddenException
            ) throw error;
            else throw new InternalServerErrorException(this.appErrorMessagesService.SERVER_ERROR);
        }
    }
}

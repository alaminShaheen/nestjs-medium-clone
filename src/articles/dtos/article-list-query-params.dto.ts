import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error-messages.service";
import { Transform } from "class-transformer";

export class ArticleListQueryParamsDto {
    @ApiPropertyOptional({
        type: String,
        example: "8b4a7636-b99c-4da8-89b5-af99b7e771dc",
        description: "Id of the author whose articles needs to be fetched"
    })
    @IsOptional()
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleListQueryParamsDto, "authorId", "string")
    })
    public authorId?: string;
    
    @ApiPropertyOptional({
        type: String,
        example: "python",
        description: "Filter articles by tag name (Not implemented yet)",
        required: false
    })
    @IsOptional()
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleListQueryParamsDto, "tag", "string")
    })
    public tag?: string;
    
    @ApiPropertyOptional({
        type: Number,
        description: "The number of articles to be fetched per request",
        required: false,
        default: 10
    })
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsInt({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleListQueryParamsDto, "limit", "number")
    })
    public limit?: number;
    
    @ApiPropertyOptional({
        type: Number,
        description: "The page number for the paginated result",
        required: false,
        default: 0
    })
    @IsOptional()
    @Transform(({ value }) => parseInt(value))
    @IsInt({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleListQueryParamsDto, "limit", "number")
    })
    public page?: number;
}

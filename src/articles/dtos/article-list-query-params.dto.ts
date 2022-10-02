import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error-messages.service";
import { Transform } from "class-transformer";

export class ArticleListQueryParamsDto {
    @ApiProperty({
        type: String,
        example: "Sakib",
        description: "Id of the author whose articles needs to be fetched",
        required: false
    })
    @IsOptional()
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleListQueryParamsDto, "authorId", "string")
    })
    public authorId?: string;
    
    @ApiProperty({
        type: String,
        example: "python",
        description: "Filter articles by tag name",
        required: false
    })
    @IsOptional()
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleListQueryParamsDto, "tag", "string")
    })
    public tag?: string;
    
    @ApiProperty({
        type: Number,
        example: 5,
        description: "The number of articles to be fetched in this request with default being 10",
        required: false,
        default: 10
    })
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsInt({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleListQueryParamsDto, "limit", "number")
    })
    public limit?: number;
    
    @ApiProperty({
        type: Number,
        example: 2,
        description: "The page number for the paginated request with default being 0",
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

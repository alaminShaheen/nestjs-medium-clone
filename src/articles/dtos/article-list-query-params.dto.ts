import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error-messages.service";

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
        description: "The number of articles to be fetched in this request",
        required: false,
        default: 20
    })
    @IsOptional()
    @IsInt({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleListQueryParamsDto, "limit", "number")
    })
    public limit?: number;
    
    @ApiProperty({
        type: Number,
        example: 2,
        description: "The number of articles to be Offset/skipped while fetching (default is 0)",
        required: false,
        default: 0
    })
    @IsOptional()
    @IsInt({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleListQueryParamsDto, "limit", "number")
    })
    public offset?: number;
}

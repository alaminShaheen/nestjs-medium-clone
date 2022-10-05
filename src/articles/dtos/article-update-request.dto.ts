import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error-messages.service";

export class ArticleUpdateRequestDto {
    @ApiPropertyOptional({
        type: String,
        description: "Title of the article",
        required: false
    })
    @IsOptional()
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleUpdateRequestDto, "title", "string")
    })
    @Length(1, 150, {
        message: DtoErrorMessagesService.STRING_MAX_CHAR(ArticleUpdateRequestDto, "title", 150)
    })
    public title: string;
    
    @ApiPropertyOptional({
        type: String,
        description: "Description of the article",
        required: false
    })
    @IsOptional()
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleUpdateRequestDto, "description", "string")
    })
    @Length(1, 300, {
        message: DtoErrorMessagesService.STRING_MAX_CHAR(ArticleUpdateRequestDto, "description", 300)
    })
    public description: string;
    
    @ApiPropertyOptional({
        type: String,
        description: "Body of the article",
        required: false
    })
    @IsOptional()
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleUpdateRequestDto, "body", "string")
    })
    public body: string;
}

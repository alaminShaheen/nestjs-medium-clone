import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error-messages.service";

export class ArticleRequestDto {
    @ApiProperty({
        type: String,
        description: "Title of the article"
    })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleRequestDto, "title", "string")
    })
    @Length(1, 150, {
        message: DtoErrorMessagesService.STRING_MAX_CHAR(ArticleRequestDto, "title", 150)
    })
    public title: string;
    
    @ApiProperty({
        type: String,
        description: "Description of the article"
    })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleRequestDto, "description", "string")
    })
    @Length(1, 300, {
        message: DtoErrorMessagesService.STRING_MAX_CHAR(ArticleRequestDto, "description", 300)
    })
    public description: string;
    
    @ApiProperty({
        type: String,
        description: "Body of the article"
    })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(ArticleRequestDto, "body", "string")
    })
    public body: string;
}

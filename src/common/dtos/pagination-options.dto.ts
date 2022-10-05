import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error-messages.service";

export class PaginationOptionsDto {
    @ApiPropertyOptional({
        type: Number,
        description: "The number of articles to be fetched per request",
        required: false,
        default: 10
    })
    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsInt({
        message: DtoErrorMessagesService.MUST_BE_TYPE(PaginationOptionsDto, "limit", "number")
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
        message: DtoErrorMessagesService.MUST_BE_TYPE(PaginationOptionsDto, "limit", "number")
    })
    public page?: number;
    
}

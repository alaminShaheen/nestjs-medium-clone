import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Match } from "../../common/decorators/match.decorator";
import { DtoErrorMessagesService } from "../../error-messages/dto-error-messages.service";

export class RegisterUserDto {
    @IsNotEmpty({
        message: DtoErrorMessagesService.IS_REQUIRED(RegisterUserDto, "email")
    })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(RegisterUserDto, "email", "string")
    })
    @IsEmail({}, {
        message: DtoErrorMessagesService.INVALID_FIELD(RegisterUserDto, "email")
    })
    email: string;
    
    @IsNotEmpty({
        message: DtoErrorMessagesService.IS_REQUIRED(RegisterUserDto, "password")
    })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(RegisterUserDto, "password", "string")
    })
    password: string;
    
    @IsNotEmpty({
        message: DtoErrorMessagesService.IS_REQUIRED(RegisterUserDto, "confirmPassword")
    })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(RegisterUserDto, "confirmPassword", "string")
    })
    @Match(RegisterUserDto, (properties) => properties.password, {
        message: DtoErrorMessagesService.NOT_MATCH(RegisterUserDto, "password", "confirmPassword")
    })
    confirmPassword: string;
}

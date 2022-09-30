import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { DtoErrorMessagesService } from "../../error-messages/dto-error-messages.service";

export class LoginUserDto {
    @IsNotEmpty({ message: DtoErrorMessagesService.IS_REQUIRED(LoginUserDto, "email") })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(LoginUserDto, "email", "string")
    })
    @IsEmail({}, {
        message: DtoErrorMessagesService.INVALID_FIELD(LoginUserDto, "email")
    })
    email: string;
    
    @IsNotEmpty({
        message: DtoErrorMessagesService.IS_REQUIRED(LoginUserDto, "password")
    })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(LoginUserDto, "password", "string")
    })
    password: string;
}

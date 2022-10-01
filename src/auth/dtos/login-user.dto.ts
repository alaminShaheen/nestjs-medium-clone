import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error-messages.service";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty({
        type: String,
        example: "some.random.email@random-domain.com",
        description: "Email of the user logging in",
        required: true
    })
    @IsNotEmpty({ message: DtoErrorMessagesService.IS_REQUIRED(LoginUserDto, "email") })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(LoginUserDto, "email", "string")
    })
    @IsEmail({}, {
        message: DtoErrorMessagesService.INVALID_FIELD(LoginUserDto, "email")
    })
    email: string;
    
    @ApiProperty({
        type: String,
        description: "Password of the user",
        required: true,
        example: "random-very-very-secure-password"
    })
    @IsNotEmpty({
        message: DtoErrorMessagesService.IS_REQUIRED(LoginUserDto, "password")
    })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(LoginUserDto, "password", "string")
    })
    password: string;
}

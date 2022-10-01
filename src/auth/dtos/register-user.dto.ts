import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Match } from "../../common/decorators/match.decorator";
import { DtoErrorMessagesService } from "../../app-messages/dto-error-messages.service";

export class RegisterUserDto {
    @ApiProperty({
        type: String,
        example: "some.random.email@random-domain.com",
        description: "Email of the user registering",
        required: true
    })
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
    
    @ApiProperty({
        type: String,
        description: "Password of the user",
        required: true,
        example: "random-very-very-secure-password"
    })
    @IsNotEmpty({
        message: DtoErrorMessagesService.IS_REQUIRED(RegisterUserDto, "password")
    })
    @IsString({
        message: DtoErrorMessagesService.MUST_BE_TYPE(RegisterUserDto, "password", "string")
    })
    password: string;
    
    @ApiProperty({
        type: String,
        description: "'confirmPassword' field of the user must match with 'password' field",
        required: true,
        example: "random-very-very-secure-password"
    })
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

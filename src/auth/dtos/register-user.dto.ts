import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { dtoErrorMessages } from "../../helpers/dtoErrors";
import { Match } from "../../decorators/match.decorator";

export class RegisterUserDto {
    @IsNotEmpty({ message: dtoErrorMessages.isRequired(RegisterUserDto, "email") })
    @IsString({
        message: dtoErrorMessages.mustBeType(RegisterUserDto, "email", "string")
    })
    @IsEmail({}, { message: dtoErrorMessages.invalidEmail() })
    email: string;
    
    @IsNotEmpty({
        message: dtoErrorMessages.isRequired(RegisterUserDto, "password")
    })
    @IsString({
        message: dtoErrorMessages.mustBeType(RegisterUserDto, "password", "string")
    })
    password: string;
    
    @IsNotEmpty({
        message: dtoErrorMessages.isRequired(RegisterUserDto, "confirmPassword")
    })
    @IsString({
        message: dtoErrorMessages.mustBeType(RegisterUserDto, "confirmPassword", "string")
    })
    @Match(RegisterUserDto, (properties) => properties.password, {
        message: dtoErrorMessages.notMatch(RegisterUserDto, "password", "confirmPassword")
    })
    confirmPassword: string;
}

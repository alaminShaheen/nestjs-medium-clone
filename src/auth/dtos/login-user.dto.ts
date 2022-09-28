import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { dtoErrorMessages } from "../../common/helpers/dtoErrors";

export class LoginUserDto {
    @IsNotEmpty({ message: dtoErrorMessages.isRequired(LoginUserDto, "email") })
    @IsString({
        message: dtoErrorMessages.mustBeType(LoginUserDto, "email", "string")
    })
    @IsEmail({}, { message: dtoErrorMessages.invalidEmail() })
    email: string;
    
    @IsNotEmpty({
        message: dtoErrorMessages.isRequired(LoginUserDto, "password")
    })
    @IsString({
        message: dtoErrorMessages.mustBeType(LoginUserDto, "password", "string")
    })
    password: string;
}

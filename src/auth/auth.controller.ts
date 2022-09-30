import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    Request,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { Tokens } from "./types/tokens.type";
import { JwtRefreshAuthGuard } from "../common/guards/jwt-refresh-auth.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUserInterceptor } from "../common/interceptors/current-user.interceptor";
import { SerializeTo } from "../common/interceptors/serialize.interceptor";
import { UserDto } from "../users/dtos/user.dto";

@Controller("auth")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    
    constructor (private readonly authService: AuthService) {
    }
    
    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async registerLocal (@Body() body: RegisterUserDto): Promise<Tokens> {
        this.logger.log("Registering user");
        return await this.authService.registerLocal(body.email, body.password);
    }
    
    @Get("whoami")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CurrentUserInterceptor)
    @SerializeTo(UserDto)
    @HttpCode(HttpStatus.OK)
    whoAmI (@Request() request): UserDto {
        return request.user;
    }
    
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async loginLocal (@Body() body: LoginUserDto): Promise<Tokens> {
        this.logger.log("Signing in user");
        return await this.authService.loginLocal(body.email, body.password);
    }
    
    @Post("logout")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async logout (@Request() request): Promise<void> {
        const user = request.user;
        return await this.authService.logout(user.userId);
    }
    
    @Post("refresh")
    @UseGuards(JwtRefreshAuthGuard)
    @HttpCode(HttpStatus.OK)
    async refreshToken (@Request() request): Promise<Tokens> {
        const { userId, refreshToken } = request.user;
        return this.authService.refreshToken(userId, refreshToken);
    }
}

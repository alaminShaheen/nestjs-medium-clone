import { Body, Controller, Get, HttpCode, HttpStatus, Logger, Request, Post, Session, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { Tokens } from "./types/tokens.type";
import { JwtRefreshAuthGuard } from "../guards/jwt-refresh-auth.guard";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

// @SerializeTo(UserDto)
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
    async whoAmI (@Session() session: Record<string, any>) {
        return "hello";
    }
    
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async loginLocal (@Body() body: LoginUserDto): Promise<Tokens> {
        this.logger.log("Signing in user");
        return await this.authService.loginLocal(body.email, body.password);
    }
    
    @UseGuards(JwtAuthGuard)
    @Post("logout")
    @HttpCode(HttpStatus.OK)
    async logout (@Request() request) {
        const user = request.user;
        return await this.authService.logout(user.userId);
    }
    
    @UseGuards(JwtRefreshAuthGuard)
    @Post("refresh")
    @HttpCode(HttpStatus.OK)
    async refreshToken () {
        return this.authService.refreshToken();
    }
}

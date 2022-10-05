import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    Req,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterUserDto } from "./dtos/register-user.dto";
import { LoginUserDto } from "./dtos/login-user.dto";
import { Tokens } from "./dtos/tokens.dto";
import { JwtRefreshAuthGuard } from "./guards/jwt-refresh-auth.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CurrentUserInterceptor } from "../common/interceptors/current-user.interceptor";
import { SerializeTo } from "../common/interceptors/serialize.interceptor";
import { UserResponseDto } from "../users/dtos/user-response.dto";
import { PublicRoute } from "./decorators/public-route.decorator";
import { DocumentationMessagesService } from "../app-messages/documentation-messages.service";
import { Request } from "express";

@Controller("auth")
@UseGuards(JwtAuthGuard)
@ApiTags("Authentication")
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    
    constructor (private readonly authService: AuthService) {
    }
    
    
    @Post("register")
    @PublicRoute()
    @HttpCode(HttpStatus.CREATED)
    @ApiBody({ type: RegisterUserDto, required: true, description: "hello" })
    @ApiCreatedResponse({
        description: DocumentationMessagesService.SUCCESSFUL_REGISTER,
        type: Tokens
    })
    @ApiBadRequestResponse({ description: DocumentationMessagesService.INVALID_REGISTER })
    async registerLocal (@Body() body: RegisterUserDto): Promise<Tokens> {
        this.logger.log("Registering user");
        return await this.authService.registerLocal(body.email, body.password);
    }
    
    
    @Post("login")
    @PublicRoute()
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LoginUserDto, required: true })
    @ApiOkResponse({
        description: DocumentationMessagesService.SUCCESSFUL_LOGIN,
        type: Tokens
    })
    @ApiBadRequestResponse({
        description: DocumentationMessagesService.INVALID_LOGIN_CREDENTIALS
    })
    async loginLocal (@Body() body: LoginUserDto): Promise<Tokens> {
        this.logger.log("Signing in user");
        return await this.authService.loginLocal(body.email, body.password);
    }
    
    
    @Post("logout")
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOkResponse({ description: DocumentationMessagesService.SUCCESSFUL_LOGOUT, type: null })
    @ApiUnauthorizedResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    async logout (@Req() request): Promise<void> {
        const user = request.user;
        return await this.authService.logout(user.userId);
    }
    
    
    @Get("refresh")
    @PublicRoute()
    @UseGuards(JwtRefreshAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: DocumentationMessagesService.NEW_TOKEN_GENERATED, type: Tokens })
    @ApiForbiddenResponse({ description: DocumentationMessagesService.INVALID_TOKENS })
    @ApiUnauthorizedResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    async refreshToken (@Req() request): Promise<Tokens> {
        const { userId, refreshToken } = request.user;
        return this.authService.refreshToken(userId, refreshToken);
    }
    
    
    @Get("whoami")
    @UseInterceptors(CurrentUserInterceptor)
    @SerializeTo(UserResponseDto)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOkResponse({ description: DocumentationMessagesService.CURRENT_USER, type: UserResponseDto })
    @ApiUnauthorizedResponse({ description: DocumentationMessagesService.UNAUTHORIZED })
    whoAmI (@Req() request: Request): UserResponseDto {
        return request.user as UserResponseDto;
    }
}

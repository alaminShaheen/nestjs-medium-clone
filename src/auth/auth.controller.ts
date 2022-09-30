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
import { UserDto } from "../users/dtos/user.dto";
import { PublicRoute } from "./decorators/public-route.decorator";

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
    @ApiBody({ type: RegisterUserDto })
    @ApiCreatedResponse({
        description: "The user has been successfully registered and logged in.",
        type: Tokens
    })
    @ApiBadRequestResponse({ description: "Will occur if provided email already exists" })
    async registerLocal (@Body() body: RegisterUserDto): Promise<Tokens> {
        this.logger.log("Registering user");
        return await this.authService.registerLocal(body.email, body.password);
    }
    
    
    @Post("login")
    @PublicRoute()
    @HttpCode(HttpStatus.OK)
    @ApiBody({ type: LoginUserDto })
    @ApiOkResponse({ description: "The user has been successfully logged in.", type: Tokens })
    @ApiBadRequestResponse({
        description: "Will occur if provided email does not exist or if credentials are invalid"
    })
    async loginLocal (@Body() body: LoginUserDto): Promise<Tokens> {
        this.logger.log("Signing in user");
        return await this.authService.loginLocal(body.email, body.password);
    }
    
    
    @Post("logout")
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOkResponse({ description: "The user has been successfully logged out", type: null })
    @ApiUnauthorizedResponse({
        description: "Will occur if provided token is invalid or user is not logged in"
    })
    async logout (@Request() request): Promise<void> {
        const user = request.user;
        return await this.authService.logout(user.userId);
    }
    
    
    @Get("refresh")
    @PublicRoute()
    @UseGuards(JwtRefreshAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: "New tokens have been generated for the user", type: Tokens })
    @ApiForbiddenResponse({ description: "Will occur if provided token is invalid" })
    @ApiUnauthorizedResponse({ description: "Will occur if user is not logged in" })
    async refreshToken (@Request() request): Promise<Tokens> {
        const { userId, refreshToken } = request.user;
        return this.authService.refreshToken(userId, refreshToken);
    }
    
    
    @Get("whoami")
    @UseInterceptors(CurrentUserInterceptor)
    @SerializeTo(UserDto)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOkResponse({ description: "Returns the current user logged in", type: UserDto })
    @ApiUnauthorizedResponse({
        description: "Will occur if provided token is invalid or user is not logged in"
    })
    whoAmI (@Request() request): UserDto {
        return request.user;
    }
}

import * as bcrypt from "bcrypt";
import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { errorMessages } from "../common/helpers/errorMessages";
import { Tokens } from "./types/tokens.type";
import { TokenConstantsService } from "../constants/token-constants.service";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    
    constructor (
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly tokenConstantsService: TokenConstantsService
    ) {
    }
    
    async registerLocal (email: string, password: string): Promise<Tokens> {
        try {
            const user = await this.usersService.findOneByEmail(email);
            if (user) throw new BadRequestException(errorMessages.emailExists());
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await this.usersService.create(email, hashedPassword, salt);
            
            const tokens = await this.generateTokens(newUser.id, newUser.email);
            
            await this.updateRefreshTokenHash(newUser.id, tokens.refreshToken);
            
            return tokens;
        } catch (error) {
            this.logger.error(error);
            if (error instanceof BadRequestException) throw error;
            throw new InternalServerErrorException(errorMessages.serverError());
        }
    }
    
    async loginLocal (email: string, password: string): Promise<Tokens> {
        try {
            const user = await this.usersService.findOneByEmail(email);
            if (!user) throw new BadRequestException(errorMessages.invalidCredentials());
            
            const passwordsMatch = await bcrypt.compare(password, user.password);
            
            if (!passwordsMatch) throw new BadRequestException(errorMessages.invalidCredentials());
            
            const tokens = await this.generateTokens(user.id, user.email);
            
            await this.updateRefreshTokenHash(user.id, tokens.refreshToken);
            
            return tokens;
            
        } catch (error) {
            this.logger.error(error);
            if (error instanceof BadRequestException) throw error;
            else throw new InternalServerErrorException(errorMessages.serverError());
        }
    }
    
    async logout (userId: string) {
        return await this.usersService.update(userId, { refreshToken: null });
    }
    
    async refreshToken () {
    
    }
    
    async updateRefreshTokenHash (userId: string, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.usersService.update(userId, { refreshToken: hashedRefreshToken });
    }
    
    async generateTokens (userId: string, email: string): Promise<Tokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                userId,
                email
            }, {
                expiresIn: TokenConstantsService.ACCESS_TOKEN_VALIDITY_DURATION,
                secret: this.tokenConstantsService.ACCESS_TOKEN_SECRET
            }),
            this.jwtService.signAsync({
                userId,
                email
            }, {
                expiresIn: TokenConstantsService.REFRESH_TOKEN_VALIDITY_DURATION,
                secret: this.tokenConstantsService.REFRESH_TOKEN_SECRET
            })
        ]);
        return { accessToken, refreshToken };
    }
}

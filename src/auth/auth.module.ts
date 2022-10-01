import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AccessTokenStrategy } from "./strategies/access-token.strategy";
import { RefreshTokenStrategy } from "./strategies/refresh-token.strategy";
import { ConstantsModule } from "../constants/constants.module";
import { AppMessagesModule } from "../app-messages/app-messages.module";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({}),
        ConstantsModule,
        AppMessagesModule
    ],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
    controllers: [AuthController]
})
export class AuthModule {
}

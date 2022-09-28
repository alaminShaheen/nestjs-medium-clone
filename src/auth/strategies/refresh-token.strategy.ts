import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { JwtPayloadType } from "../types/jwt-payload.type";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
    constructor (private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>("REFRESH_TOKEN_SECRET"),
            ignoreExpiration: false,
            // This option does not destroy the token and instead passes it to request object
            // We are doing this so that we can hash and store the token in db so that when a
            // future request for refreshing token comes, we can verify this token against the
            // saved and hashed refresh token in db
            passReqToCallback: true
        });
    }
    
    validate (request: Request, payload: JwtPayloadType) {
        // Now we extract the token from the request object. It is already present due to
        // "passReqToCallback" option being true
        const bearerToken = request.get("authorization");
        const refreshToken = bearerToken.replace("Bearer", "").trim();
        return { ...payload, refreshToken };
    }
}

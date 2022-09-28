import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { JwtPayloadType } from "../types/jwt-payload.type";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor (private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET")
        });
    }
    
    // decodedJwtPayload contains decoded information from the access token
    validate (decodedJwtPayload: JwtPayloadType) {
        console.log(decodedJwtPayload);
        // Doing so will attach payload in request object to user field
        return decodedJwtPayload;
    }
}

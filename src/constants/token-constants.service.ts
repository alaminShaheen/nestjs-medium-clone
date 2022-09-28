import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TokenConstantsService {
    public static readonly ACCESS_TOKEN_VALIDITY_DURATION: string | number = "15m";
    public static readonly REFRESH_TOKEN_VALIDITY_DURATION: string | number = "7d";
    
    constructor (private readonly configService: ConfigService) {
    }
    
    get ACCESS_TOKEN_SECRET (): string {
        return this.configService.get<string>("ACCESS_TOKEN_SECRET");
    }
    
    get REFRESH_TOKEN_SECRET (): string {
        return this.configService.get<string>("REFRESH_TOKEN_SECRET");
    }
}

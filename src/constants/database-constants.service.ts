import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseConstantsService {
    constructor (private readonly configService: ConfigService) {
    }
    
    get DB_TYPE (): string {
        return this.configService.get<string>("DB_TYPE");
    }
    
    get DB_HOST (): string {
        return this.configService.get<string>("DB_HOST");
    }
    
    get DB_NAME (): string {
        return this.configService.get<string>("DB_NAME");
    }
    
    get DB_USER (): string {
        return this.configService.get<string>("DB_USER");
    }
    
    get DB_PASSWORD (): string {
        return this.configService.get<string>("DB_PASSWORD");
    }
    
    get DB_PORT (): number {
        return this.configService.get<number>("DB_PORT");
    }
    
    get DB_SYNCHRONIZE (): boolean {
        return this.configService.get<boolean>("DB_SYNCHRONIZE");
    }
}

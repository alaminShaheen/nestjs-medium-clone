import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppConstantsService {
    constructor (private readonly configService: ConfigService) {
    }
}

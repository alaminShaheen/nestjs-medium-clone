import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";

@Controller("healthcheck")
@ApiTags("Healthcheck")
@Controller()
export class AppController {
    constructor (private readonly appService: AppService) {
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({
        description: "App is running successfully.",
        type: String
    })
    healthcheck (): string {
        return this.appService.healthcheck();
    }
}

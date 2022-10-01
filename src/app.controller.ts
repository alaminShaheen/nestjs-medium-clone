import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { DocumentationMessagesService } from "./app-messages/documentation-messages.service";

@Controller("healthcheck")
@ApiTags("Healthcheck")
@Controller()
export class AppController {
    constructor (private readonly appService: AppService) {
    }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: DocumentationMessagesService.SERVER_RUNNING, type: String })
    healthcheck (): string {
        return this.appService.healthcheck();
    }
}

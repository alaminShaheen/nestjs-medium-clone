import { Module } from "@nestjs/common";
import { AppErrorMessagesService } from "./app-error-messages.service";
import { DtoErrorMessagesService } from "./dto-error-messages.service";
import { DocumentationMessagesService } from "./documentation-messages.service";

@Module({
    providers: [AppErrorMessagesService, DtoErrorMessagesService, DocumentationMessagesService],
    exports: [AppErrorMessagesService]
})
export class AppMessagesModule {
}

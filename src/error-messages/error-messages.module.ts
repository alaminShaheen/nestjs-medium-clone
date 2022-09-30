import { Module } from "@nestjs/common";
import { ErrorMessagesService } from "./error-messages.service";
import { DtoErrorMessagesService } from "./dto-error-messages.service";

@Module({
    providers: [ErrorMessagesService, DtoErrorMessagesService],
    exports: [ErrorMessagesService]
})
export class ErrorMessagesModule {
}

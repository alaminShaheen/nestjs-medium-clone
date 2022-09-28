import { Module } from "@nestjs/common";
import { AppConstantsService } from "./app-constants.service";
import { TokenConstantsService } from "./token-constants.service";
import { DatabaseConstantsService } from "./database-constants.service";

@Module({
    providers: [AppConstantsService, TokenConstantsService, DatabaseConstantsService],
    exports: [AppConstantsService, TokenConstantsService, DatabaseConstantsService]
})
export class ConstantsModule {
}

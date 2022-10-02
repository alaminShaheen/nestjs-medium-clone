import { Module } from "@nestjs/common";
import { AppConstantsService } from "./app-constants.service";
import { TokenConstantsService } from "./token-constants.service";

@Module({
    providers: [AppConstantsService, TokenConstantsService],
    exports: [AppConstantsService, TokenConstantsService]
})
export class ConstantsModule {
}

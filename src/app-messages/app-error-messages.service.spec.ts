import { Test, TestingModule } from "@nestjs/testing";
import { AppErrorMessagesService } from "./app-error-messages.service";

describe("ErrorMessagesService", () => {
    let service: AppErrorMessagesService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppErrorMessagesService]
        }).compile();
    
        service = module.get<AppErrorMessagesService>(AppErrorMessagesService);
    });
    
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

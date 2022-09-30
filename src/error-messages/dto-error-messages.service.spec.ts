import { Test, TestingModule } from "@nestjs/testing";
import { DtoErrorMessagesService } from "./dto-error-messages.service";

describe("DtoErrorMessagesService", () => {
    let service: DtoErrorMessagesService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DtoErrorMessagesService]
        }).compile();
        
        service = module.get<DtoErrorMessagesService>(DtoErrorMessagesService);
    });
    
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

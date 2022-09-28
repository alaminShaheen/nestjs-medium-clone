import { Test, TestingModule } from "@nestjs/testing";
import { AppConstantsService } from "./app-constants.service";

describe("ConstantsService", () => {
    let service: AppConstantsService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppConstantsService]
        }).compile();
        
        service = module.get<AppConstantsService>(AppConstantsService);
    });
    
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

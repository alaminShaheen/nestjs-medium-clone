import { Test, TestingModule } from "@nestjs/testing";
import { DocumentationMessagesService } from "./documentation-messages.service";

describe("DocumentationMessagesService", () => {
    let service: DocumentationMessagesService;
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [DocumentationMessagesService]
        }).compile();
        
        service = module.get<DocumentationMessagesService>(DocumentationMessagesService);
    });
    
    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});

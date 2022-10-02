import { Injectable } from "@nestjs/common";

@Injectable()
export class AppConstantsService {
    get ARTICLE_LIST_DEFAULT_LIMIT () {
        return 20;
    }
}

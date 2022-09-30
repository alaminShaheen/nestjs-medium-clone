import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    healthcheck (): string {
        return "Server is up and running!";
    }
}

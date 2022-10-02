import { Injectable } from "@nestjs/common";
import { StringUtils } from "../common/utils/string.utils";

@Injectable()
export class AppErrorMessagesService {
    get EMAIL_EXISTS () {
        return "User with email already exists";
    }
    
    get SERVER_ERROR () {
        return "An internal server error occurred";
    }
    
    get INVALID_CREDENTIALS_PROVIDED () {
        return "Invalid credentials provided";
    }
    
    get USER_NOT_FOUND () {
        return "User does not exist";
    }
    
    get USER_UNAUTHENTICATED () {
        return "User is not authenticated";
    }
    
    get FORBIDDEN_RESOURCE () {
        return "You don't have permission to access this server";
    }
    
    get DATABASE_SEEDING () {
        return "Database seeding failed";
    }
    
    static FIELD_REQUIRED (fieldName: string) {
        return `${StringUtils.capitalize(fieldName)} is required`;
    }
    
}

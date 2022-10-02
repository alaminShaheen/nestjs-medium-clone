import { Injectable } from "@nestjs/common";

@Injectable()
export class DocumentationMessagesService {
    constructor () {
    }
    
    //////////////////
    // Auth
    //////////////////
    
    static get SUCCESSFUL_REGISTER () {
        return "The user has successfully registered and has been logged in.";
    }
    
    static get INVALID_REGISTER () {
        return "Provided email already exists.";
    }
    
    static get SUCCESSFUL_LOGIN () {
        return "The user has successfully logged in.";
    }
    
    static get INVALID_LOGIN_CREDENTIALS () {
        return "Provided email does not exist or if credentials are invalid.";
    }
    
    static get SUCCESSFUL_LOGOUT () {
        return "The user has successfully logged OUT.";
    }
    
    static get UNAUTHORIZED () {
        return "Provided token is invalid or user is not logged in.";
    }
    
    static get NEW_TOKEN_GENERATED () {
        return "New tokens have been generated for the user.";
    }
    
    static get INVALID_TOKENS () {
        return "Provided token is invalid.";
    }
    
    static get CURRENT_USER () {
        return "Returns the current user logged in.";
    }
    
    //////////////////
    // Healthcheck
    //////////////////
    
    static get SERVER_RUNNING () {
        return "Server is up and running successfully.";
    }
    
    
    //////////////////
    // Articles
    //////////////////
    static get FETCH_ARTICLES () {
        return "Returns articles according to query.";
    }
}

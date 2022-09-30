import { ExecutionContext, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { ErrorMessagesService } from "../../error-messages/error-messages.service";

export class JwtAuthGuard extends AuthGuard("jwt") {
    private readonly logger: Logger = new Logger(JwtAuthGuard.name);
    
    constructor (private readonly errorMessagesService: ErrorMessagesService) {
        super();
    }
    
    canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Add custom auth logic here
        return super.canActivate(context);
    }
    
    handleRequest (err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            this.logger.error(this.errorMessagesService.USER_UNAUTHENTICATED);
            throw err || new UnauthorizedException(this.errorMessagesService.USER_UNAUTHENTICATED);
        }
        return user;
    }
}

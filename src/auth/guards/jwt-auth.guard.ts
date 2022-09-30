import { ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { ErrorMessagesService } from "../../error-messages/error-messages.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    private readonly logger: Logger = new Logger(JwtAuthGuard.name);
    
    constructor (
        private readonly errorMessagesService: ErrorMessagesService,
        private readonly reflector: Reflector
    ) {
        super();
    }
    
    canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // Add custom auth logic here
        // Returning true means authenticated
        // Otherwise is not authorized and custom error handling done by handleRequest function
        
        // This line checks for routes (also known as handlers) first and then controller
        // that have the "public" metadata set so that authentication won't be required
        const isPublicRoute = this.reflector.getAllAndOverride(
            "public",
            [
                context.getHandler(),
                context.getClass()
            ]
        );
        
        return isPublicRoute ? true : super.canActivate(context);
    }
    
    handleRequest (err, user) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            this.logger.error(this.errorMessagesService.USER_UNAUTHENTICATED);
            throw err || new UnauthorizedException(this.errorMessagesService.USER_UNAUTHENTICATED);
        }
        
        // Adds user to request object
        // Here user is userId and email i.e. whatever we attached in jwt token
        return user;
    }
}

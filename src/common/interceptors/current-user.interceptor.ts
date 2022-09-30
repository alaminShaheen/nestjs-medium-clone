import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor (private readonly usersService: UsersService) {
    }
    
    async intercept (context: ExecutionContext, next: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.user;
        
        request.user = await this.usersService.findOneById(userId);
        return next.handle();
    }
}

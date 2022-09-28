import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator((context: ExecutionContext) => {

});


// @Injectable()
// export class CurrentUserInterceptor implements NestInterceptor {
//     constructor (private readonly usersService: UsersService) {
//     }
//
//     async intercept (context: ExecutionContext, next: CallHandler) {
//         const request = context.switchToHttp().getRequest();
//         const { userId } = request.session || {};
//
//         if (userId) {
//             request.currentUser = await this.usersService.findOne(userId);
//         }
//         return next.handle();
//     }
// }

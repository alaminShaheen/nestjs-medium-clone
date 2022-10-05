import { UserResponseDto } from "./users/dtos/user-response.dto";

declare namespace Express {
    export interface User extends Express.User {
        userId: string;
        email: string;
    }
    
    export interface Request {
        user?: UserResponseDto;
    }
}

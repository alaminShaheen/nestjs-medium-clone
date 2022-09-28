declare namespace Express {
    export interface User extends Express.User {
        userId: string;
        email: string;
    }
}

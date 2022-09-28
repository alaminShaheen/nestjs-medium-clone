import { Expose } from "class-transformer";

export class UserDto {
    @Expose()
    public id: string;
    
    @Expose()
    public email: string;
    
    @Expose()
    public createdAt: Date;
    
    @Expose()
    public updatedAt: Date;
}

import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
    @ApiProperty({
        type: String,
        description: "User id of the user"
    })
    @Expose()
    public id: string;
    
    @ApiProperty({
        type: String,
        description: "Email of the user"
    })
    @Expose()
    public email: string;
    
    @ApiProperty({
        type: String,
        description: "Creation date of the user"
    })
    @Expose()
    public createdAt: Date;
    
    @ApiProperty({
        type: String,
        description: "Date when user was last updated"
    })
    @Expose()
    public updatedAt: Date;
}

import { ApiProperty } from "@nestjs/swagger";

export class Tokens {
    @ApiProperty({
        type: String,
        description: "The bearer token that must be set in authentication header for every authenticated requests"
    })
    public accessToken: string;
    
    @ApiProperty({
        type: String,
        description: "The bearer token that must be set in authentication header when requesting for new access tokens when existing access token expires"
    })
    public refreshToken: string;
    
    constructor (accessToken, refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

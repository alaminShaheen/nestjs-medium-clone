import { Expose, Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ArticleDto {
    @ApiProperty({
        type: String,
        description: "Unique Id of the article"
    })
    @Expose()
    public slug: string;
    
    @ApiProperty({
        type: String,
        description: "Title of the article"
    })
    @Expose()
    public title: string;
    
    @ApiProperty({
        type: String,
        description: "Description of the article"
    })
    @Expose()
    public description: string;
    
    @ApiProperty({
        type: String,
        description: "Body of the article"
    })
    @Expose()
    public body: string;
    
    @ApiProperty({
        type: String,
        description: "Date of creation of the article"
    })
    @Expose()
    public createdAt: Date;
    
    @ApiProperty({
        type: String,
        description: "Date of modification of the article"
    })
    @Expose()
    public updatedAt: Date;
    
    @ApiProperty({
        type: Number,
        description: "Count of claps of the article"
    })
    @Expose()
    public clapCount: number;
    
    @ApiProperty({
        type: String,
        description: "Author Id of the author of the article"
    })
    @Transform(({ obj }) => obj.authorId)
    @Expose()
    public authorId: string;
}

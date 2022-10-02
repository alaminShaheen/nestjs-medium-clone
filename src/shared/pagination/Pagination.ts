import { IPaginationResult } from "./IPaginationResult";
import { ApiProperty } from "@nestjs/swagger";

export class Pagination<PaginationEntity> implements IPaginationResult<PaginationEntity> {
    @ApiProperty({ isArray: true })
    public results: PaginationEntity[];
    
    @ApiProperty()
    public total: number;
    
    @ApiProperty()
    public hasMore: boolean;
    
    constructor (paginationResults: IPaginationResult<PaginationEntity>) {
        this.results = paginationResults.results;
        this.total = paginationResults.total;
        this.hasMore = paginationResults.hasMore;
    }
}

import { IPaginationResult } from "./IPaginationResult";

export class Pagination<PaginationEntity> implements IPaginationResult<PaginationEntity> {
    public results: PaginationEntity[];
    public total: number;
    public hasMore: boolean;
    
    constructor (paginationResults: IPaginationResult<PaginationEntity>) {
        this.results = paginationResults.results;
        this.total = paginationResults.total;
        this.hasMore = paginationResults.hasMore;
    }
}

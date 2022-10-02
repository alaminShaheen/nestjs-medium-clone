export interface IPaginationResult<PaginationEntity> {
    results: PaginationEntity[];
    total: number;
    hasMore: boolean;
}

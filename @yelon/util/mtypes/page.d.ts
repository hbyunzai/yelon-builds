export interface YunzaiPageParam<T> {
    pageNum?: number;
    pageSize?: number;
    pageParam?: T;
}
export interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: PageableSort;
    unpaged: boolean;
}
export interface PageableSort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}
export interface YunzaiPageResult<T> {
    content: T[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: Pageable;
    size: number;
    sort: PageableSort;
    totalElements: number;
    totalPages: number;
}
export declare class YunzaiPageBuilder<T extends any | unknown> {
    private page;
    pageNum(pageNum: number): this;
    pageSize(pageSize: number): this;
    pageParam(param: T): this;
    default(): this;
    build(): YunzaiPageParam<T>;
}
export declare class Page<T> {
    pageNum: number;
    pageSize: number;
    param?: Partial<T>;
    private constructor();
    static create<T>(): Page<T>;
}

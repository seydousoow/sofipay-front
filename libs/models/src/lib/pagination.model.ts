export interface IPaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

export interface IPage<T> {
  content: T[];
  size: number;
  number: number;
  numberOfElements: number;
  totalPages: number;
  totalElements: number;
}

export interface IPagination {
  page: number;
  size: number;
  totalElements: number;
}

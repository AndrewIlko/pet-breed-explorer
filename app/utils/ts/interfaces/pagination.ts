export interface IPaginationOptions {
  page: number;
  limit: number;
  hasMoreDogData?: boolean;
  hasMoreCatData?: boolean;
  search?: string | null;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  hasMoreDogData?: boolean;
  hasMoreCatData?: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPaginationMeta;
}

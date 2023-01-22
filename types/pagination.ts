export interface Pagination {
  items: number,
  pageSize: number,
  currentPage: number,
  onPageChange: (page: number) => void;
  siblingCount?: number;
}
export type Pageable<T> = {
  page: number;
  size: number;
  lastKey?: T;
};

export interface PaginationConfig {
  pageIndex: number;
  pageSize: number;
}

export function paginate<T>(
  items: T[] | null | undefined,
  config: PaginationConfig
): T[] {
  if (!items) return [];
  const start = config.pageIndex * config.pageSize;
  return items.slice(start, start + config.pageSize);
}

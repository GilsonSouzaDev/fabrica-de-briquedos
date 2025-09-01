import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator(): MatPaginatorIntl {
  const customPaginatorIntl = new MatPaginatorIntl();
  customPaginatorIntl.itemsPerPageLabel = 'Itens por página:';
  return customPaginatorIntl;
}

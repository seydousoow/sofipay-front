export interface ITableColumn {
  name: 'checkbox' | string;
  sortableField?: string;
  width?: number;
  class?: string;
}

export interface ISort {
  property: string;
  direction: 'asc' | 'desc';
}

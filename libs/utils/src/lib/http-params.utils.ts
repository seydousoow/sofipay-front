import { IPaginationParams, ISort } from '@sofipay/models';
import { HttpParams } from '@angular/common/http';

export const stringifySortParam = (sort: ISort): string => [sort.property, sort.direction].join(',');

type TAuthorizedType = boolean | number | string;

export const buildHttpParams = (search: string | undefined, pagination: IPaginationParams, parameters?: {
  [k: string]: TAuthorizedType
}): HttpParams => {
  const params: { [k: string]: TAuthorizedType } = { page: pagination.page ?? 0, size: pagination.size ?? 50 };

  if (search !== undefined && search?.length > 0) params['search'] = search;
  if (pagination.sort !== undefined && pagination.sort?.length > 0) params['sort'] = pagination.sort;

  if (parameters) {
    Object.keys(parameters).forEach(key => {
      const value = parameters[key];
      if (value !== null && value !== undefined && String(value).length > 0) params[key] = value;
    });
  }

  return new HttpParams({ fromObject: params });
};

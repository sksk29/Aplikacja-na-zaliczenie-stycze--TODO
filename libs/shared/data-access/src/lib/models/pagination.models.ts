import { SORT_ORDER } from '../constants';

export interface IPageOptions {
  readonly order: keyof typeof SORT_ORDER;
  readonly page: number;
  readonly limit: number;
  readonly orderBy: string;
}

export interface IPageMetadata extends Omit<IPageOptions, 'order' | 'orderBy'> {
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviousPage: boolean;
  readonly hasNextPage: boolean;
}

export interface IPage<T> {
  readonly data: T[];
  readonly metadata: IPageMetadata;
}

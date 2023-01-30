import { IPageMetadata, IPageOptions } from '@todo-app/shared/data-access';

interface IMetadataCtor {
  pageOptions: IPageOptions;
  itemCount: number;
}

export class PageMetadataDto implements IPageMetadata {
  public readonly page: number;
  public readonly limit: number;
  public readonly itemCount: number;
  public readonly pageCount: number;
  public readonly hasPreviousPage: boolean;
  public readonly hasNextPage: boolean;

  constructor({ pageOptions, itemCount }: IMetadataCtor) {
    this.page = pageOptions.page;
    this.limit = pageOptions.limit;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(itemCount / pageOptions.limit);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page * this.limit < itemCount;
  }
}

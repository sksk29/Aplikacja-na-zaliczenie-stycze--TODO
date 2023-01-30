import { IPage, IPageMetadata } from '@todo-app/shared/data-access';
import { PageMetadataDto } from './page-meta.dto';

export class PageDto<T> implements IPage<T> {
  public readonly data: T[];
  public readonly metadata: IPageMetadata;

  constructor(data: T[], metadata: PageMetadataDto) {
    this.data = data;
    this.metadata = metadata;
  }
}

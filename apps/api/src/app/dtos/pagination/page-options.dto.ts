import { ValidationSchema, Enum, Number, String } from '@nest-up/nest-fastest-validator';
import { IPageOptions, SORT_ORDER } from '@todo-app/shared/data-access';
import { Transform } from 'class-transformer';

@ValidationSchema()
export class PageOptionsDto implements IPageOptions {
  @Enum({
    values: Object.values(SORT_ORDER),
    nullable: false,
    optional: true
  })
  public readonly order: keyof typeof SORT_ORDER = SORT_ORDER.asc;

  @Number({
    positive: true,
    integer: true,
    convert: true,
    optional: true,
    nullable: false,
    min: 1
  })
  @Transform(({ value }) => parseInt(value, 10) || 1)
  public readonly page: number = 1;

  @Number({
    positive: true,
    integer: true,
    convert: true,
    optional: true,
    nullable: false,
    min: 1,
    max: 100
  })
  @Transform(({ value }) => parseInt(value, 10) || 10)
  public readonly limit: number = 10;

  @String({
    alpha: true,
    optional: true,
    empty: false,
    trim: true,
    min: 1
  })
  public readonly orderBy: string = 'createdAt';

  public get skip(): number {
    return (this.page - 1) * this.limit;
  }
}

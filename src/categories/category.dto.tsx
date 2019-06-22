import { IsString, IsNumber } from "class-validator";

export default class CategoryDTO {
  @IsString()
  public name: string;

  public slug: string;

  public parentId: string | null;

  @IsNumber()
  public order: number | 0;

  constructor(name: string, slug: string, parentId: string, order: number) {
    this.name = name;
    this.slug = slug;
    this.parentId = parentId;
    this.order = order;
  }
}

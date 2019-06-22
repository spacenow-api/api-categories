import { Table, Column, Model, CreatedAt, UpdatedAt, IsUUID, PrimaryKey, AllowNull, Unique, Default, BeforeCreate, HasMany, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import uuidV4 from 'uuid/v4'

@Table
export class Category extends Model<Category> {
 
  @IsUUID(4)
  @PrimaryKey
  @Column
  id!: string;
 
  @Unique
  @Column
  name!: string;

  @Column
  slug!: string;

  @AllowNull(true)
  @Default(null)
  @ForeignKey(() => Category)
  @Column
  parentId?: string;

  @Default(0)
  @Column
  order!: number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => Category, 'parentId')
  children: Category[] | undefined

  @BeforeCreate
  static async generateId(instance: Category) {
    instance.id = uuidV4();
  }

  @BeforeCreate
  static async generateSlug(instance: Category) {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;';
    const b = 'aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------';
    const p = new RegExp(a.split('').join('|'), 'g');
    instance.slug = instance.name.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(p, c => b.charAt(a.indexOf(c)))
      .replace(/&/g, '-and-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  };
 
}
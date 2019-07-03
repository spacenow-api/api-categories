interface ICategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
  order: number;
  isActive: boolean;
}

interface IBookingPeriodLegacy {
  id: number;
  listSettingsParentId: number;
  monthly: number;
  weekly: number;
  daily: number;
  hourly: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ISubCategoryLegacy {
  id: number;
  listSettingsParentId: number;
  listSettingsChildId: number;
  typeId: number;
  itemName: string;
  otherItemName: string;
  description: string;
  maximum: number;
  minimum: number;
  startValue: number;
  endValue: number;
  step: string;
  isEnable: string;
  photo: string;
  photoType: string;
  isSpecification: number;
  createdAt: Date;
  updatedAt: Date;
  specData: string;
  bookingPeriod: IBookingPeriodLegacy;
}

interface ICategoryLegacy {
  id: number;
  typeId: number;
  itemName: string;
  otherItemName: string;
  description: string;
  maximum: number;
  minimum: number;
  startValue: number;
  endValue: number;
  step: string;
  isEnable: string;
  photo: string;
  photoType: string;
  isSpecification: number;
  createdAt: Date;
  updatedAt: Date;
  specData: string;
  subCategories: Array<ISubCategoryLegacy>;
}

export { ICategory, ICategoryLegacy, ISubCategoryLegacy, IBookingPeriodLegacy };


export interface ICategory {
  _id: string;
  name: string;
  subCategories?: ISubCategory[];
}

export interface ISubCategory {
    _id: string;
    name: string;
    category: string;
}

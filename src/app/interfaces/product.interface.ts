export interface IProduct {
  _id: string;
  feedbacksCount: number;
  images: IProductImage[];
  name: string;
  price: number;
  rating?: number | null;
  status: boolean;
}
export interface IProductImage {
  url: string;
  source: string;
}

export interface IPriceData {
  value: number;
  highValue: number;
}
export interface IProductQuery {
  id?: string;
  name?: string;
  value?: string;
  highValue?: string;
  productName?: string;
  brandsQuery?: string;
}

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

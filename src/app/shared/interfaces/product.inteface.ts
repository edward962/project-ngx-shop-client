export interface IProduct {
  _id: string;
  feedbacksCount: number;
  name: string;
  description: string;
  feedbacks: IFeedback[];
  characteristics?: ICharacteristics[];
  price: number;
  status: boolean;
  images: IProductImage[];
  rating: number;
  brand?: string;
  count?: number;
  subCategory: string;
}

export interface IFeedback {
  product: string;
  rate: number;
  advantages: string;
}

export interface IProductImage {
  url: string;
  source: string;
}
interface ICharacteristics {
  title: string;
  items: ICharacteristic[];
}

interface ICharacteristic {
  name: string;
  value: string;
  isExtended: boolean;
}

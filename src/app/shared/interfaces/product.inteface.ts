export interface IProduct {
  _id: string;
  feedbacksCount: number;
  count?: number;
  name: string;
  description: string;
  feedbacks?: IFeedback;
  characteristics?: ICharacteristics[];
  price: number;
  status: boolean;
  images: IProductImage[];
  rating: number;
}

export interface IFeedback {
  rate?: number;
  advantages?: string;
  limitations?: string;
  description?: string;
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

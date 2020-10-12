import { createReducer, on, Action } from '@ngrx/store';
import {
  getProductPending,
  getProductSuccess,
  clearProduct,
  createFeedbackSuccess,
} from '../actions/product.actions';

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

export interface IProductState {
  item: IProduct;
  loading: boolean;
}

const initialState: IProductState = {
  item: {
    _id: '',
    description: '',
    feedbacksCount: 0,
    name: '',
    price: 0,
    images: [],
    subCategory: '',
    feedbacks: [],
    status: false,
    rating: 0,
    brand: '',
  },
  loading: false,
};
const productReducer = createReducer(
  initialState,
  // tslint:disable-next-line:typedef
  on(getProductPending, (state: IProductState) => ({
    ...state,
    loading: true,
  })),
  // tslint:disable-next-line:typedef
  on(getProductSuccess, (state: IProductState, { product }) => ({
    ...state,
    item: product,
    loading: false,
  })),
  // tslint:disable-next-line:typedef
  on(createFeedbackSuccess, (state: IProductState, { rating, feedback }) => ({
    ...state,
    item: {
      ...state.item,
      rating,
      feedbacksCount: state.item.feedbacksCount + 1,
      feedbacks: [...state.item.feedbacks, feedback],
    },
    loading: false,
  })),
  // tslint:disable-next-line:typedef
  on(clearProduct, () => initialState)
);

export function reducerProduct(
  state: IProductState | undefined,
  action: Action
): {
  item: IProduct;
  loading: boolean;
} {
  return productReducer(state, action);
}

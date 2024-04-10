import { CB } from './c-b';

export interface CartData {
  status: string;
  numOfCartItems: number;
  data: Data;
}

export interface Data {
  _id: string;
  cartOwner: string;
  products: Product3[];
  totalCartPrice: number;
}

export interface Product3 {
  count: number;
  _id: string;
  product: Product2;
  price: number;
}

export interface Product2 {
  subcategory: CB[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: CB;
  brand: CB;
  ratingsAverage: number;
  id: string;
}

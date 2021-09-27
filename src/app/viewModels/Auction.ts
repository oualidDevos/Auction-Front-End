import { Product } from './ProductdetailsViewModel';
export interface Auction {
  id: number,
  startDate: string,
  endDate: string,
  startingPrice: number,
  status: boolean,
  productId: number,
  product: Product
}

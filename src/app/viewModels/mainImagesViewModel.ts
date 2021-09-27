import { Attachement } from './Attachment';
import { ProductViewModel } from './ProductViewModel';

export interface MainBidsViewModel {
  error: string[],
  data: Data[]
}

export interface Data {
  product: ProductViewModel,
  mainImage: Attachement,
  bidsNumber: number,
  currentBid: number,
  currentRentBid: number
}


export interface GetImageViewModel {
  error: string[],
  data: Attachement[]
}


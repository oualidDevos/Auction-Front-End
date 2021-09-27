import { Activity } from './activity';
import { Attachement } from './Attachment';
import { Products } from './ShowProductViewModel';
export interface ProductDetailsViewModel {
  error: any[],
  data: ProductDetails[]
}

export interface ProductDetails {
  currentBid: number,
  currentRentBid: number,
  endDate: string,
  startDate: string,
  product: Product,
  auctionId: string,
  bidsNumber: number
}


export interface Product {
  id: string
  qr: string,
  dataMatrix: string,
  price: number,
  address: string,
  number: string,
  longitude: string,
  latitude: string,
  description: string,
  title: string,
  activity: Activity,
  activityId: number,
  surface: number,
  rentPrice: number
}

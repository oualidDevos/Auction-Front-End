import { Activity } from './activity';
import { Attachement } from './Attachment';
export interface ShowProductViewModel {
  error: string[],
  data: Products[]
}

export interface Products {
  title: string,
  currentBid: number,
  endDate: string,
  mainImage: Attachement,
  address: string,
  productId: string,
  activityId: number,
  activity: Activity,
  bidsNumber:  number,
  currentRentBid: number
}

import { Bids } from './Bids';
export interface ReturnedAuctionBids {
  error: string[],
  data: DataSearchDTO[]
}

export interface DataSearchDTO {
  list: Bids[],
  pageCount: number
}

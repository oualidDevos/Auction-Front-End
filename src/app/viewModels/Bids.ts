import { Auction } from './Auction';
import { Bidder } from './BidderViewModel';
export interface Bids {
  id: number,
  amount: number,
  bidDate: string,
  auctionId: number,
  auction: Auction,
  bidderId: number,
  bidder: Bidder
  rentAmount: number,
  createdAt: string,
  lastUpdatedAt: string,
  deleteddAt: string
}

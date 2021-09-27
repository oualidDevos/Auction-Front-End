import { Bidder } from "./BidderViewModel";

export interface RegisterViewModel {
  email: string,
  password: string,
  confirmPassword: string,
  bidder: Bidder
}

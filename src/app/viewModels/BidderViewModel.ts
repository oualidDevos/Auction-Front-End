import { Activity } from './activity';
export interface Bidder {
  FirstName: string
  LastName : string
  FirstNameAr: string
  LastNameAr: string
  BirthDate: string
  IdentityCard: string
  Address: string,
  phoneNumber: number,
  activityId: number,
  activity?: Activity
}

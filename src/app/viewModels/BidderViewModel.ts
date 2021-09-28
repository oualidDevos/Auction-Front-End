import { Activity } from './activity';
export interface Bidder {
  firstName: string
  lastName : string
  firstNameAr: string
  lastNameAr: string
  birthDate: string
  identityCard: string
  address: string,
  phoneNumber: number,
  activityId: number,
  activity?: Activity
}

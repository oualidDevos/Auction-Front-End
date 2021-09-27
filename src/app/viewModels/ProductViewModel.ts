import { Activity } from './activity';
export interface ProductViewModel {
  id: number,
  qr: string,
  dataMatrix: string,
  price: number,
  address: string,
  number: number,
  longitude: number,
  latitude: number,
  description: string,
  title: string,
  surface: number,
  activity: Activity,
  activityId: number,
  rentPrice: number
}

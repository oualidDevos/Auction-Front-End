import { Product } from './ProductdetailsViewModel';
import { Attachement } from './Attachment';
// attachment: {id: 1, contentType: 'image/png', ext: 'png', type: 'image', file: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBw…vO9hP/wDkrd/si7eE+HgTY65u7c7/AP7ler1P20P3pH//2Q=='}
// bidsNumber: 7
// latestBid: 1200000
// product: {id: 3, qr: 'Y456987', dataMatrix: 'X456987', price: 100000, address: 'Berkane', …}



export interface MyOwnBidsViewModel  {
  error: string[],
  data: OwnBids[]
}


export interface OwnBids {
  attachment: Attachement,
  bidsNumber: number,
  latestBid: number,
  latestRentBid: number,
  productLatestBid: number,
  productLatestRentBid: number,
  product: Product
}

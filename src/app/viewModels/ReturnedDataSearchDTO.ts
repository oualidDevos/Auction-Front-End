import { Auction } from "./Auction"

export interface ReturnedDataSearchDTO {
  error: string[],
  data: DataSearchDTO[]
}

export interface DataSearchDTO {
  list: Auction[],
  pageCount: number
}

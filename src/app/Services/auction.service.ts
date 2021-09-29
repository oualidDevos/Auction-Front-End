import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnedAuctionBids } from '../viewModels/ReturnedAuctionBids';
import { ReturnedDataSearchDTO } from '../viewModels/ReturnedDataSearchDTO';
import { SearchDTO } from '../viewModels/SearchDTO';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://141.95.0.29:4949/api/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionStorage.getItem("jwt") == null ? '': sessionStorage.getItem("jwt")}` })
  };


  getListAuctions(searchDTO: SearchDTO): Observable<any> {
    return this.http.post<ReturnedDataSearchDTO>(this.baseUrl + "auctions/FilteredAuctions", searchDTO, this.httpOptions)
  }

  getListAuctionBids(searchDTO: SearchDTO): Observable<any> {
    return this.http.post<ReturnedAuctionBids>(this.baseUrl + "Bids/FilteredBids", searchDTO, this.httpOptions)
  }
}

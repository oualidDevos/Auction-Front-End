import { environment } from './../../environments/environment.prod';
import { MakeBidViewModel } from './../viewModels/MakeBidViewModel';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyOwnBidsViewModel } from '../viewModels/myOwnBids';
import { ReturnedBidderData } from '../viewModels/ReturnedBidderData';

@Injectable({
  providedIn: 'root'
})
export class BidderService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionStorage.getItem("jwt") == null ? '': sessionStorage.getItem("jwt")}` })
  };


  bid(bid: MakeBidViewModel): Observable<any> {
    return this.http.post<MakeBidViewModel>(this.baseUrl + "Bids", bid, this.httpOptions);
  }

  // getOwnBids(bidderId: string) {
  //   return this.http.get<MyOwnBidsViewModel>(this.baseUrl + "bidders/getbiddersOwnBids/" + bidderId, this.httpOptions);
  // }

  getOwnBids(bidderId: string) {
    return this.http.get<MyOwnBidsViewModel>(this.baseUrl + "bidders/GetOwnBidsWithouAttachments/" + bidderId, this.httpOptions);
  }

  getBidderDetail(bidderId: number){
    return this.http.get<ReturnedBidderData>(this.baseUrl + "bidders/BidderDetailByBidId/" + bidderId, this.httpOptions);
  }

}

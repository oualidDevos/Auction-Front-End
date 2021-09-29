import { Attachement } from './../viewModels/Attachment';
import { ShowProductViewModel } from './../viewModels/ShowProductViewModel';
import { GetImageViewModel, MainBidsViewModel } from './../viewModels/mainImagesViewModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionStorage.getItem("jwt") == null ? '': sessionStorage.getItem("jwt")}` })
  };


  // getMainProducts(bidderId: string): Observable<any>{
  //   return this.http.get<MainBidsViewModel>(this.baseUrl + "products/GetMainProducts/" + bidderId, this.httpOptions);
  // }

  // showProducts(filter: string = "ASC"): Observable<any> {
  //   return this.http.get<ShowProductViewModel>(this.baseUrl + "products/ShowProducts/" + sessionStorage.getItem('bidderId') +"/"+ filter, this.httpOptions)
  // }

  productDetails(productId: number): Observable<any> {
    return this.http.get<ShowProductViewModel>(this.baseUrl + "products/details/" + productId, this.httpOptions)
  }


  getProductAttachements(productId: any): Observable<any>{
    return this.http.get<Attachement[]>(this.baseUrl + "attachments/GetAttachmentsByProductId/" + productId, this.httpOptions);
  }

  getProductOwnAtt(productId: any){
    return this.http.get<GetImageViewModel>(this.baseUrl + "attachments/GetMainAttachmentByProductId/" + productId, this.httpOptions)
  }

  showProducts(filter: string = "ASC"): Observable<any> {
    return this.http.get<ShowProductViewModel>(this.baseUrl + "products/ShowProductsWithoutAttachments/" + sessionStorage.getItem('bidderId') +"/"+ filter, this.httpOptions)
  }

  getMainProducts(bidderId: string): Observable<any>{
    return this.http.get<MainBidsViewModel>(this.baseUrl + "products/GetMainProductsWithoutAttachments/" + bidderId, this.httpOptions);
  }

}

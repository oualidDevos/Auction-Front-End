import { ShowProductViewModel } from './../viewModels/ShowProductViewModel';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
// import { ShowProductViewModel } from '../viewModels/ShowProductViewModel';

@Component({
  selector: 'app-bid-cards',
  templateUrl: './bid-cards.component.html',
  styleUrls: ['./bid-cards.component.css']
})
export class BidCardsComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit(): void {
  }

  rowsToCreate: number = 0;
  @Input() ShowProductViewModel?: ShowProductViewModel;

  getAttachement(contentType: any, bytes: any): any {
    let objectUrl = `data:${contentType};base64,${bytes}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
  }

  detail(productId: string){
    this.router.navigate(["/bid/" + productId]);
  }

}

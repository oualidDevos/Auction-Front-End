import { ProductService } from './../Services/product.service';
import { Product } from './../viewModels/ProductdetailsViewModel';
import { Router } from '@angular/router';
import { BidderService } from './../Services/bidder.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MyOwnBidsViewModel } from '../viewModels/myOwnBids';

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer, private bidderService: BidderService, private router: Router, private productService: ProductService) { }

  myOwnBidsViewModel?: MyOwnBidsViewModel;

  async ngOnInit(): Promise<void> {

    const isActivated = sessionStorage.getItem('isActivated');
    const isAdmin = sessionStorage.getItem('userRole');

    if( isActivated && isAdmin === 'User'){
      if( isActivated == "false" ){
        this.router.navigate(["/"]);
      }
    }

    const bidderId = sessionStorage.getItem('bidderId');
    if( bidderId ) {
      await this.bidderService.getOwnBids(bidderId).toPromise()
      .then(
        m=> {
          this.myOwnBidsViewModel = m;
        }
      );
    }

    this.myOwnBidsViewModel?.data.forEach(element => {
      this.productService.getProductOwnAtt(element.product.id).toPromise()
      .then(
        m=> {
          element.attachment = m.data[0];
        }
      )
    });
  }

  getAttachement(contentType: any, bytes: any): any {
    let objectUrl = `data:${contentType};base64,${bytes}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
  }

}

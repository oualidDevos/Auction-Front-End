import { Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { ProductService } from '../Services/product.service';
import { MainBidsViewModel } from '../viewModels/mainImagesViewModel';
import { ShowProductViewModel } from '../viewModels/ShowProductViewModel';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router, private productService: ProductService, private sanitizer: DomSanitizer, private spinner: NgxSpinnerService) { }

  MainBidsViewModel: MainBidsViewModel | undefined;


  async ngOnInit(): Promise<void> {

    // if( this.authService.i )

    await this.ShowProducts();
    await this.MainProducts();

    this.MainBidsViewModel?.data.forEach( (element) =>  {

      this.productService.getProductOwnAtt(element.product.id).toPromise()
      .then(
        m => {
          // console.log(m);
          element.mainImage = m.data[0];
        }
      )
      }
    );


    this.ShowProductViewModel?.data.forEach(element => {
      // console.log(element.productId);

      this.productService.getProductOwnAtt(element.productId).subscribe(
        m => {
          // element.mainImage = .data.;
          element.mainImage = m.data[0];
        }
      )
      }
    );

    // this.showSpinner();
  }




  async MainProducts(): Promise<void> {
    let bidderId = sessionStorage.getItem('bidderId');
      if( bidderId ){
        await this.productService.getMainProducts2(bidderId).toPromise()
      . then(
          m=> {
            this.MainBidsViewModel = m;
          }
      )
      }
  }

  formatDate(dateToFormat: string) {
    return dateToFormat.substring(0, 14);
  }

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

  ShowProductViewModel?: ShowProductViewModel;
  async ShowProducts(filter: string = "ASC"): Promise<void> {
    await this.productService.showProducts2(filter).toPromise()
    .then(
      m=> {
        this.ShowProductViewModel = m;
      }
    );

    this.ShowProductViewModel?.data.forEach(element => {
      console.log(element.productId);

      this.productService.getProductOwnAtt(element.productId).subscribe(
        m => {
          // element.mainImage = .data.;
          element.mainImage = m.data[0];
        }
      )
      }
    );
  }

  detail(productId: string){
    this.router.navigate(["/bid/" + productId])
  }


  getAttachement(contentType: any, bytes: any): any {
    let objectUrl = `data:${contentType};base64,${bytes}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
  }

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  isCollapsed: boolean =  true;
  isCollapsedDate: boolean =  true;
  isCollapsedLocalisation: boolean =  true;

  logOut(){
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("bidderId");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userRole");
    this.router.navigate(["/login"])
  }



}

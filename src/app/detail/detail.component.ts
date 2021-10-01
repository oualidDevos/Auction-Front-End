import { AuthService } from './../Services/auth.service';
import { MakeBidViewModel } from './../viewModels/MakeBidViewModel';
import { BidderService } from './../Services/bidder.service';
import { Attachement } from './../viewModels/Attachment';
import { ProductDetailsViewModel } from './../viewModels/ProductdetailsViewModel';
import { ProductService } from './../Services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private bidderService: BidderService, private fb:FormBuilder ,private router: Router,  private route: ActivatedRoute, private productService: ProductService, private sanitizer: DomSanitizer, private authService: AuthService) { }

  currentBid: number = 0;

  isUserAccountActivated() {
    if( this.authService.isUserAccountActivated() === 'True'){
      return true;
    }else{
      return false;
    }
  }

  attachements: Attachement[] = [];

  showSpinner() {
    this.spinner.show();
    // setTimeout(() => {
    //   this.spinner.hide();
    // }, 5000);
  }

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  productId: number = 1;
  async ngOnInit(): Promise<void> {


    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    await this.productDetails(this.productId);
    if( this.ProductDetailsViewModel?.error != null ){
      this.router.navigate(["/main"]);
    }else{

      if( this.ProductDetailsViewModel ){
          this.contributionValue = this.ProductDetailsViewModel?.data[0].currentBid;
          // this.rentValue = this.ProductDetailsViewModel?.data[0].currentRentBid;
          this.currentBid = this.ProductDetailsViewModel.data[0].currentBid;
          this.currentRentValue = this.ProductDetailsViewModel.data[0].currentRentBid;
          this.oldValue = this.currentBid;
          this.rentValue = this.ProductDetailsViewModel.data[0].bidsNumber === 0 ? 0 : this.ProductDetailsViewModel.data[0].currentRentBid + 100

          if( this.currenuImageDisplayed === undefined ){
            // this.currenuImageDisplayed = "https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif"{
              this.showSpinner();
            }

          this.percentageToPayFrom = (Number(this.currentBid) * 0.05) + this.currentBid;
          this.dataRegistred = this.fb.group({
            amount : [null,Validators.compose([Validators.required, Validators.min(this.percentageToPayFrom), Validators.pattern("^[0-9]*$")])]
          })
      }
    }

    await this.getProductAttachments(this.productId);
  }

  currentRentValue: number = 0;

  formatDate(dateToFormat: string) {
    return dateToFormat.substring(0, 16).replace("T", " ");
  }

  ProductDetailsViewModel?: ProductDetailsViewModel;

  error: boolean = false;
  isNotSuccess: boolean = false;

  async productDetails(productId: number): Promise<void> {
    await this.productService.productDetails(productId).toPromise()
    .then(
      m => {
        this.ProductDetailsViewModel = m;
      },
      err => {
        this.error = true;
        console.log(err);
      }
    )
  }

  async getProductAttachments(productId: any){
    await this.productService.getProductAttachements(this.productId).toPromise()
    .then(
      m=> {
        this.attachements = m.data;

        if( this.attachements ){
          if( this.attachements.length > 0 ){
            this.spinner.hide();
            this.currenuImageDisplayed = this.getAttachement(this.attachements[0].contentType, this.attachements[0].file)
          }
        }else{
           setTimeout(() => {
            this.spinner.hide();
            this.currenuImageDisplayed = "assets/store.png"
          }, 5000);
        }
      }
    )
  }


  displayCurrentImage(src: string) {
    this.currenuImageDisplayed = src;
  }
  currenuImageDisplayed?: string = undefined;

  Increment() {
    this.oldValue += 2000;
    this.rentValue += 100;
    this.isDiabled = false;
  }

  Decriment() {
    if( this.currentBid < this.oldValue && this.currentRentValue < this.rentValue)
    {
      this.oldValue -= 2000;
      this.rentValue -= 100;
      this.isDiabled = true;
    }else {
      this.isDiabled = false;
    }
  }

  success: boolean = false;

  dataRegistred = this.fb.group({})

  get Amount()
  {
    return this.dataRegistred.controls['amount']
  }

  percentageToPayFrom?: number;

  getAttachement(contentType: any, bytes: any): any {
    let objectUrl = `data:${contentType};base64,${bytes}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
  }

  issuccess?: Boolean;

  contributionValue = 0;
  rentValue :number = 0;

  oldValue = 0;

  isDiabled: boolean = true;

  selectedBid?: number = 0;

  GetSelectedTextValue(event: any) {
    this.selectedBid = event.target.value;

    if( this.selectedBid != 0){
      this.rentValue = this.ProductDetailsViewModel?.data[0].currentRentBid ? this.ProductDetailsViewModel?.data[0].currentRentBid + 100 : 0;
    }else{
      this.rentValue = 0;
    }
  }

  priceList: number[] = [2000, 2500, 3000, 3500, 4000, 5000, 5000, 6000];


  async onSubmit(){

    // if( this.isDiabled == false ){
      if( this.ProductDetailsViewModel )
      {
          // if( Number(this.Amount.value) < Number(this.ProductDetailsViewModel?.data[0].currentBid) ){
          //   this.dataRegistred.markAllAsTouched();
          // }else{
            const bidderId = sessionStorage.getItem("bidderId");

            if( bidderId ){

              // if( this.ProductDetailsViewModel.data[0].bidsNumber != 0 ){
              //   if( this.selectedBid == 0 )
              //   {
              //     this.issuccess = false;
              //     return;
              //   }
              // }

              await this.bidderService.bid({ amount: Number(this.selectedBid), auctionId: Number(this.ProductDetailsViewModel.data[0].auctionId), bidderId: Number(bidderId), rentAmount: 0}).
                toPromise().then( m=> {
                  if( m.error === null ){
                    this.issuccess = true;
                    this.ngOnInit();
                  }else{
                    this.issuccess = false;
                  }
              }, err => {
                this.issuccess = false;
                console.log(err);
              });
            }

          // }
      // }
    }
    else{
    //   this.dataRegistred.markAllAsTouched();
    }
  }


  popupImage(srcImage: any, src: any, myModal: any) {
    srcImage.src = src.src;
    myModal.style.display = 'block';
  }

  closeImage(myModal: any) {
    myModal.style.display = 'none';
  }
}

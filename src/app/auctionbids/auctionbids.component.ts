import { AuthService } from './../Services/auth.service';
import { AuctionService } from './../Services/auction.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bids } from '../viewModels/Bids';
import { SearchDTO } from '../viewModels/SearchDTO';

@Component({
  selector: 'app-auctionbids',
  templateUrl: './auctionbids.component.html',
  styleUrls: ['./auctionbids.component.css']
})
export class AuctionbidsComponent implements OnInit {

  constructor(private router: Router,private authService:AuthService ,private auctionService: AuctionService, private route: ActivatedRoute, private fb:FormBuilder) { }

  auctionId: number = 0;

  async ngOnInit(): Promise<void> {
    if( this.isUserAdmin() ){
      this.auctionId = Number(this.route.snapshot.paramMap.get('id'));
      await this.getListAuctionBids({}, this.auctionId);
    }else {
      this.router.navigate(['/']);
    }
  }

  searchDTO: SearchDTO = {};
  page: number = 0;
  pageCount: number = 0;
  list:Bids[] = [];
  dataRegistred = this.fb.group({order : [-1]});

  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  get Order() {
    return this.dataRegistred.controls['order'];
  }


  async nextPageHandler(): Promise<void> {
    const searchDTO: SearchDTO = { pageSize: 10, page: this.page - 1 }
    await this.getListAuctionBids(searchDTO, this.auctionId);
  }

  async onSubmit(form: any): Promise<void> {

    console.log(this.Order.value);

    if(this.Order.value != "-1"){
      await this.getListAuctionBids({ pageSize: 10, order: (this.Order.value)}, this.auctionId);
    }
  }

  async getListAuctionBids(searchDTO: SearchDTO, auctionId: number): Promise<void>{
    await this.auctionService.getListAuctionBids(searchDTO, auctionId).toPromise()
      .then(
        m => {
          this.pageCount = m.data[0].pageCount;
          this.list = m.data[0].list;
        }
      );
  }

  formatDate(dateToFormat: string) {
    return dateToFormat.substring(0, 16).replace("T", " ");
  }

}

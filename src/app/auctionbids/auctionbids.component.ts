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
      await this.getListAuctionBids({auctionId: this.auctionId});
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


  async nextPageHandler($event: any): Promise<void> {
    let targets: any[] = $event.target.innerHTML.split(' ');
    let pageNumber = 0;
    pageNumber = parseInt(targets[1]);
    this.page = Number(pageNumber);
    const searchDTO: SearchDTO = { pageSize: 10, page: this.page - 1,auctionId: this.auctionId }
    await this.getListAuctionBids(searchDTO);
  }

  async onSubmit(form: any): Promise<void> {
    if(this.Order.value != "-1"){
      await this.getListAuctionBids({ pageSize: 10, order: (this.Order.value), auctionId: this.auctionId});
    }
  }

  async getListAuctionBids(searchDTO: SearchDTO): Promise<void>{
    await this.auctionService.getListAuctionBids(searchDTO).toPromise()
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

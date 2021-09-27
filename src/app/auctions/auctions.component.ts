import { Router } from '@angular/router';
import { AuctionService } from './../Services/auction.service';
import { Component, OnInit } from '@angular/core';
import { SearchDTO } from '../viewModels/SearchDTO';
import { Auction } from '../viewModels/Auction';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  constructor(private auctionService: AuctionService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.getListAuctions(this.searchDTO);
  }

  searchDTO: SearchDTO = {};
  page: number = 0;
  list: Auction[] = [];

  async getListAuctions(searchDTO: SearchDTO): Promise<void>{
    await this.auctionService.getListAuctions(searchDTO).toPromise()
      .then(
        m => {
          console.log(m.data[0].list);
          this.list = m.data[0].list;
        }
      );
  }

  detailProduct(productId: number){
    this.router.navigate(['/bid', productId])
  }

  formatDate(dateToFormat: string) {
    return dateToFormat.substring(0, 16).replace("T", " ");
  }

}

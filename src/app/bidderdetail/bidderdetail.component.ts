import { Bids } from './../viewModels/Bids';
import { AuctionService } from './../Services/auction.service';
import { Bidder } from './../viewModels/Bidder';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BidderService } from '../Services/bidder.service';
import { MyOwnBidsViewModel } from '../viewModels/myOwnBids';
import { SearchDTO } from '../viewModels/SearchDTO';

@Component({
  selector: 'app-bidderdetail',
  templateUrl: './bidderdetail.component.html',
  styleUrls: ['./bidderdetail.component.css']
})
export class BidderdetailComponent implements OnInit {


  constructor(private route: ActivatedRoute, private bidderService: BidderService, private auctionService: AuctionService) { }

  bidderId: number = 0;
  bidder?: Bidder;
  myOwnBidsViewModel?: MyOwnBidsViewModel;
  page: number = 0;
  pageCount: number = 0;

  async ngOnInit(): Promise<void> {
    this.bidderId = Number(this.route.snapshot.paramMap.get('id'));

    this.bidderService.getBidderDetail(this.bidderId).toPromise()
    .then(
      m=> {
        this.bidder = m.data[0];
      }
    )

    await this.bidderService.getOwnBids(this.bidderId.toString()).toPromise()
      .then(
        m=> {
          this.myOwnBidsViewModel = m;
        }
      );

      let searchDTO: SearchDTO = { bidderId: this.bidderId };
      await this.getListAuctionBids(searchDTO);
      // await this.
  }

  list: Bids[] = [];

  async getListAuctionBids(searchDTO: SearchDTO): Promise<void>{
    await this.auctionService.getListAuctionBids(searchDTO).toPromise()
      .then(
        m => {
          this.pageCount = m.data[0].pageCount;
          this.list = m.data[0].list;
          console.log('list');

          console.log(this.list);

        }
      );
  }

  async nextPageHandler($event: any): Promise<void> {
    let targets: any[] = $event.target.innerHTML.split(' ');
    let pageNumber = 0;
    pageNumber = parseInt(targets[1]);
    this.page = Number(pageNumber);
    const searchDTO: SearchDTO = { pageSize: 10, page: this.page - 1, bidderId: this.bidderId }
    await this.getListAuctionBids(searchDTO);
  }

}

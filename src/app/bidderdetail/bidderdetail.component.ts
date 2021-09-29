import { Bidder } from './../viewModels/Bidder';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BidderService } from '../Services/bidder.service';
import { MyOwnBidsViewModel } from '../viewModels/myOwnBids';

@Component({
  selector: 'app-bidderdetail',
  templateUrl: './bidderdetail.component.html',
  styleUrls: ['./bidderdetail.component.css']
})
export class BidderdetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private bidderService: BidderService) { }

  bidderId: number = 0;
  bidder?: Bidder;
  myOwnBidsViewModel?: MyOwnBidsViewModel;


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
          console.log(this.myOwnBidsViewModel);

        }
      );
  }


}

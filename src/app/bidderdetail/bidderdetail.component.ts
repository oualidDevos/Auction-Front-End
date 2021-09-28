import { Bidder } from './../viewModels/Bidder';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BidderService } from '../Services/bidder.service';

@Component({
  selector: 'app-bidderdetail',
  templateUrl: './bidderdetail.component.html',
  styleUrls: ['./bidderdetail.component.css']
})
export class BidderdetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private bidderService: BidderService) { }

  bidderId: number = 0;
  bidder?: Bidder;

  ngOnInit(): void {
    this.bidderId = Number(this.route.snapshot.paramMap.get('id'));

    this.bidderService.getBidderDetail(this.bidderId).toPromise()
    .then(
      m=> {
        console.log(m);
        this.bidder = m.data[0];
      }
    )

    console.log(this.bidder);
  }

}

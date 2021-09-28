import { AuthService } from './../Services/auth.service';
import { ActivityService } from './../Services/activity.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuctionService } from './../Services/auction.service';
import { Component, OnInit } from '@angular/core';
import { SearchDTO } from '../viewModels/SearchDTO';
import { Auction } from '../viewModels/Auction';
import { Activity } from '../viewModels/activity';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  constructor(private route: Router, private authService: AuthService,private fb:FormBuilder, private auctionService: AuctionService, private router: Router, private activityService: ActivityService) { }

  async ngOnInit(): Promise<void> {
    if( this.isUserAdmin() === true){
      await this.getListAuctions(this.searchDTO);
      await this.getListActivities();
    }else {
      this.route.navigate(['/'])
    }
  }


  isUserAdmin() {
    return this.authService.isUserAdmin();
  }

  searchDTO: SearchDTO = {};
  page: number = 0;
  pageCount: number = 0;
  list: Auction[] = [];
  listActivites: Activity[] = [];

  dataRegistred = this.fb.group({activityId : [-1]});

  async getListActivities(): Promise<void> {
    await this.activityService.getActivities().toPromise()
    .then(
      m => {
        this.listActivites = m.data;
      }
    )
  }

  async getListAuctions(searchDTO: SearchDTO): Promise<void>{
    await this.auctionService.getListAuctions(searchDTO).toPromise()
      .then(
        m => {
          this.pageCount = m.data[0].pageCount;
          this.list = m.data[0].list;
        }
      );
  }

  async nextPageHandler(): Promise<void> {
    const searchDTO: SearchDTO = { pageSize: 10, page: this.page - 1 }
    await this.getListAuctions(searchDTO);
  }

  detailProduct(productId: number){
    this.router.navigate(['/bid', productId])
  }

  formatDate(dateToFormat: string) {
    return dateToFormat.substring(0, 16).replace("T", " ");
  }

  async onSubmit(form: any): Promise<void> {
    if(this.ActivityId.value > -1){
      await this.getListAuctions({ pageSize: 10, activityId: Number(this.ActivityId.value)});
    }
  }

  get ActivityId() {
    return this.dataRegistred.controls['activityId'];
  }
}

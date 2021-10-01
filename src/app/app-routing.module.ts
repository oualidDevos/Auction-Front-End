import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AuctionbidsComponent } from './auctionbids/auctionbids.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { TestComponent } from './test/test.component';
import { DetailComponent } from './detail/detail.component';
import { BidCardsComponent } from './bid-cards/bid-cards.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { InscriptionComponent } from './inscription/inscription.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { BidsComponent } from './bids/bids.component';
import { MyBidsComponent } from './my-bids/my-bids.component';
import { TrailerComponent } from './trailer/trailer.component';
import { AdminGuardService } from './guards/admin-guard.service';
import { BidderdetailComponent } from './bidderdetail/bidderdetail.component';

const routes: Routes = [
  { path: '', component: TrailerComponent, data: { state: 'trailer' } },
  { path: 'login', component: LoginComponent, data: { state: 'login' } },
  { path: 'forgot-password', component: ForgotpasswordComponent},
  {
    path: 'inscription',
    component: InscriptionComponent,
    data: { state: 'register' },
  },
  { path: 'main', component: BidsComponent, canActivate: [AuthGuardService] },
  {
    path: 'cards',
    component: BidCardsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'bid/:id',
    component: DetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'mybids',
    component: MyBidsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'auctions',
    component: AuctionsComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  {path: 'bidder/:id',component: BidderdetailComponent,canActivate: [AuthGuardService, AdminGuardService]},
  { path: 'bids/:id', component: AuctionbidsComponent, canActivate: [AuthGuardService]},
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  // imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

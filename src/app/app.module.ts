import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';

import  { JwtModule } from  "@auth0/angular-jwt"
import { AuthGuardService } from './guards/auth-guard.service';
import { NotfoundComponent } from './notfound/notfound.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BidsComponent } from './bids/bids.component';
import { BidCardsComponent } from './bid-cards/bid-cards.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DetailComponent } from './detail/detail.component';
import { TestComponent } from './test/test.component';
import { MyBidsComponent } from './my-bids/my-bids.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrailerComponent } from './trailer/trailer.component';
import { VimeModule } from '@vime/angular';
import { AuctionsComponent } from './auctions/auctions.component';
import { AuctionbidsComponent } from './auctionbids/auctionbids.component';

registerLocaleData(localeFr, 'fr');

export function tokenGetter(){
  return sessionStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InscriptionComponent,
    MainComponent,
    NotfoundComponent,
    BidsComponent,
    BidCardsComponent,
    DetailComponent,
    TestComponent,
    MyBidsComponent,
    TrailerComponent,
    AuctionsComponent,
    AuctionbidsComponent,
  ],
  imports: [
    VimeModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        disallowedRoutes: []
      }
    }),
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuardService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

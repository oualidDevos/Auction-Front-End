import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionbidsComponent } from './auctionbids.component';

describe('AuctionbidsComponent', () => {
  let component: AuctionbidsComponent;
  let fixture: ComponentFixture<AuctionbidsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionbidsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionbidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

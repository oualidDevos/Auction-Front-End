import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidCardsComponent } from './bid-cards.component';

describe('BidCardsComponent', () => {
  let component: BidCardsComponent;
  let fixture: ComponentFixture<BidCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderdetailComponent } from './bidderdetail.component';

describe('BidderdetailComponent', () => {
  let component: BidderdetailComponent;
  let fixture: ComponentFixture<BidderdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidderdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

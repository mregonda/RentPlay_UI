import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentspecificdetailsComponent } from './instrumentspecificdetails.component';

describe('InstrumentspecificdetailsComponent', () => {
  let component: InstrumentspecificdetailsComponent;
  let fixture: ComponentFixture<InstrumentspecificdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentspecificdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentspecificdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

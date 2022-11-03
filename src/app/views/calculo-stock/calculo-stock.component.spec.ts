import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculoStockComponent } from './calculo-stock.component';

describe('CalculoStockComponent', () => {
  let component: CalculoStockComponent;
  let fixture: ComponentFixture<CalculoStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculoStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

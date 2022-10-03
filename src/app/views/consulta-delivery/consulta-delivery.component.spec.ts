import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaDeliveryComponent } from './consulta-delivery.component';

describe('ConsultaDeliveryComponent', () => {
  let component: ConsultaDeliveryComponent;
  let fixture: ComponentFixture<ConsultaDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

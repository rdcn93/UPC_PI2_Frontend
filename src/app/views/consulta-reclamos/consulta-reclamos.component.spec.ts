import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaReclamosComponent } from './consulta-reclamos.component';

describe('ConsultaReclamosComponent', () => {
  let component: ConsultaReclamosComponent;
  let fixture: ComponentFixture<ConsultaReclamosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaReclamosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaReclamosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionAddEditComponent } from './promocion-add-edit.component';

describe('PromocionAddEditComponent', () => {
  let component: PromocionAddEditComponent;
  let fixture: ComponentFixture<PromocionAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocionAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromocionAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

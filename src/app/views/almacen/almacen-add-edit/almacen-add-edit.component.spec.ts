import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenAddEditComponent } from './almacen-add-edit.component';

describe('AlmacenAddEditComponent', () => {
  let component: AlmacenAddEditComponent;
  let fixture: ComponentFixture<AlmacenAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

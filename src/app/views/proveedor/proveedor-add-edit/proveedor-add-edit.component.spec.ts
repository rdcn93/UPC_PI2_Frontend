import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorAddEditComponent } from './proveedor-add-edit.component';

describe('ProveedorAddEditComponent', () => {
  let component: ProveedorAddEditComponent;
  let fixture: ComponentFixture<ProveedorAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProveedorAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedorAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

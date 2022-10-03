import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamoAddEditComponent } from './reclamo-add-edit.component';

describe('ReclamoAddEditComponent', () => {
  let component: ReclamoAddEditComponent;
  let fixture: ComponentFixture<ReclamoAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamoAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamoAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

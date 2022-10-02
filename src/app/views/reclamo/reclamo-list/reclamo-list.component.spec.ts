import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamoListComponent } from './reclamo-list.component';

describe('ReclamoListComponent', () => {
  let component: ReclamoListComponent;
  let fixture: ComponentFixture<ReclamoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

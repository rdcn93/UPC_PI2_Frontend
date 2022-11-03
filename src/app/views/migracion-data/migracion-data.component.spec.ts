import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MigracionDataComponent } from './migracion-data.component';

describe('MigracionDataComponent', () => {
  let component: MigracionDataComponent;
  let fixture: ComponentFixture<MigracionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MigracionDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MigracionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

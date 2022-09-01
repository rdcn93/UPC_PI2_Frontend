import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Page500registerComponent } from './page500register.component';

describe('Page500registerComponent', () => {
  let component: Page500registerComponent;
  let fixture: ComponentFixture<Page500registerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Page500registerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Page500registerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

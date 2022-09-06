import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class WidgetsComponent implements AfterContentInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popovers',
  templateUrl: './popovers.component.html',
  styleUrls: ['./popovers.component.sass']
})
export class PopoversComponent implements OnInit {

  visible = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.visible = !this.visible;
    }, 3000);
  }

}

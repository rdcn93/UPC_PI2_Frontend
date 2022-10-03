import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor(private jwtHelper: JwtHelperService) {
  }

  ngOnInit(): void {
    this.slides[0] = {
      src: './assets/img/slides/premier1.jpg',
    };
    this.slides[1] = {
      src: './assets/img/slides/premier2.jpg',
    }
    this.slides[2] = {
      src: './assets/img/slides/premier2.jpg',
    }
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }
}

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    setTimeout(() => {

      this.router.navigate(['/auth']);
      
    }, 2500);

  }

}

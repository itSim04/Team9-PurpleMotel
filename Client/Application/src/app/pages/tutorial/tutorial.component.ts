import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent {

  index = 1;
  tutorial = '../../../assets/tutorial/tutorial-' + this.index + '.png';

  constructor (private router: Router) { }
  next() {

    if (this.index == 6) {
      localStorage.setItem('tutorial', 'true');
      this.router.navigate(['/auth']);
    } else {

      this.tutorial = '../../../assets/tutorial/tutorial-' + ++this.index + '.png';
    }

  }
}

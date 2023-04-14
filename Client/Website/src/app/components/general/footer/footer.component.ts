import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() main_color = '#FFFFFF';
  @Input() alt_color = '#FFFFFF';

  @Input() font_color = '#000000';

}

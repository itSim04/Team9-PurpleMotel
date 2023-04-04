import { Component, OnInit } from '@angular/core';
import { formatPrice, formatWord } from '../../database.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  formatPrice(price: number): string {

    return formatPrice(price);

  }

  formatWord(word: string | number | symbol | undefined) {

    return formatWord(word);

  }


}

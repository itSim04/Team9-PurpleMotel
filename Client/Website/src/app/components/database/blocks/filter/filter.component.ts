import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  constructor () { }

  ngOnInit() { }

  parseInt(num: string | number) {

    try {

      return Number.parseFloat(num + "");

    } catch {

      return 0;

    }
  }

  formatWord(word: string | number | symbol | undefined) {

    if (!word) return "";

    const splits = word.toString().replace("_", " ").split(" ");
    for (let i = 0; i < splits.length; i++) {

      splits[i] = splits[i][0].toUpperCase() + splits[i].slice(1).toLowerCase();

    }

    return splits.join(" ");
  }

}

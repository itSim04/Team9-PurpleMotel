import { Component, OnInit } from '@angular/core';

export function formatWord(word: string | number | symbol | undefined) {

  if (!word) return "";

  const splits = word.toString().replaceAll("_", " ").split(" ");
  for (let i = 0; i < splits.length; i++) {

    splits[i] = splits[i][0].toUpperCase() + splits[i].slice(1).toLowerCase();

  }

  return splits.join(" ");
}

export function parseInt(num: string | number) {

  try {

    return Number.parseFloat(num + "");

  } catch {

    return 0;

  }

}
export function Required(target: object, propertyKey: string) {
  Object.defineProperty(target, propertyKey, {
    get() {
      throw new Error(`Attribute ${propertyKey} is required`);
    },
    set(value) {
      Object.defineProperty(target, propertyKey, {
        value,
        writable: true,
        configurable: true,
      });
    },
    configurable: true
  });
}

export function formatPrice(price: number | undefined, reversed = false): string {

  if (price) {

    const numStr = price.toString();

    // split the number string into groups of three digits from right to left
    const numArr = numStr.split('').reverse().join('').match(/(\d{1,3})/g);

    // join the groups with commas and return the result from right to left
    const temp = numArr?.join(',')?.split('').reverse().join('') || numStr;

    if (reversed) {

      return temp + " USD";

    } else {

      return "USD " + temp;

    }

  } else {

    return '';

  }
}



@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent implements OnInit {

  constructor () { }

  ngOnInit() { }

}

import { KeyValue } from '@angular/common';
import { Component } from '@angular/core';

declare global {
  interface Map<K, V> {
    getPair(property: K): KeyValue<K, V>;

  }
}

if (!Map.prototype.getPair) {

  Map.prototype.getPair = function <K, V>(property: K): KeyValue<K, V> {

    return {

      key: property,
      value: this.get(property)

    };

  };

}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Application';
}

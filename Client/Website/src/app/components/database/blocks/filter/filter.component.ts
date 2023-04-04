import { Component, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Column, DataInjection } from 'src/app/models/Database';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent<Data> {

  @Input() data: [string, Data][] = [];
  @Input() data_injection!: DataInjection<Data>;
  @Input() filtered_data!: MatTableDataSource<[string, Data], MatPaginator>;
  filter_by!: Column<Data>;
  filter: string | number = "";
  formatWord(word: string | number | symbol | undefined) {

    if (!word) return "";

    const splits = word.toString().replaceAll("_", " ").split(" ");
    for (let i = 0; i < splits.length; i++) {

      splits[i] = splits[i][0].toUpperCase() + splits[i].slice(1).toLowerCase();

    }

    return splits.join(" ");
  }

  updateFilter(event: Column<Data>) {

    this.filter_by = event;
    this.filter = "";

  }

  updateFilterValue(event: string | number) {


    this.filter = event;

  }
  applyFilter(event?: boolean) {

    if (event) {
      this.filtered_data.data = this.data.filter(t => {

        let value = JSON.stringify(t[1][this.filter_by.key]);

        if (!Number.isNaN(Number.parseFloat(value))) {

          value = Math.floor(Number.parseFloat(value + "")).toString();

        }

        return JSON.stringify(value).includes(this.filter.toString());

      });

    } else {

      this.filtered_data.data = this.data;
      this.filter = "";

    }

  }



  parseInt(num: string | number) {

    try {

      return Number.parseFloat(num + "");

    } catch {

      return 0;

    }

  }


}

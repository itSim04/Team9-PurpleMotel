import { Component, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Column, DataInjection } from 'src/app/models/Database';
import { formatWord, parseInt, Required } from '../../database.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent<Data, Data2> {

  @Input() @Required data: [string, Data][] = [];

  @Input() @Required other_data?: [string, Data2][] = [];
  @Input() @Required data_injection!: DataInjection<Data>;
  @Input() @Required filtered_data!: MatTableDataSource<[string, Data], MatPaginator>;
  filter_by!: Column<Data>;
  filter: string | number = "";
  formatWord(word: string | number | symbol | undefined) {

    return formatWord(word);

  }

  updateFilter(event: Column<Data>) {

    this.filter_by = event;
    this.filter = "";

  }

  updateFilterValue(event: string | number) {


    this.filter = event;

  }
  applyFilter(event?: boolean, link: boolean = false) {

    if (event) {

      if (link && this.other_data && this.filter_by.link && this.filter_by.link.format_index) {

        const temp = this.other_data.filter(t => {

          return JSON.stringify(t[1][this.filter_by.link?.format_index as keyof Data2]).toLowerCase().includes(this.filter.toString().toLowerCase());

        }).map(data => data[0]);


        this.filtered_data.data = this.data.filter(t => {

          return temp.includes("" + (t[1][this.filter_by.link!.key]));

        });





      } else {

        this.filtered_data.data = this.data.filter(t => {

          let value = JSON.stringify(t[1][this.filter_by.key]);

          if (!Number.isNaN(Number.parseFloat(value))) {

            value = Math.floor(Number.parseFloat(value + "")).toString();

          }

          return JSON.stringify(value.toLowerCase()).includes(this.filter.toString().toLowerCase());

        });
      }

    } else {

      this.filtered_data.data = this.data;
      this.filter = "";

    }

  }



  parseInt(num: string | number) {

    return parseInt(num);

  }


}

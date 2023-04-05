import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Observable, Subject } from 'rxjs';
import { DataInjection, Column, ChangeInjection } from 'src/app/models/Database';

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

export function isNum(val: string) {

  return !Number.isNaN(Number(val));

}



@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent<Data, Data2> implements AfterViewInit, OnInit {

  @Input() @Required data_injection!: DataInjection<Data>;
  @Input() dual_fetcher: (() => Observable<[Map<string, Data>, Map<string, Data2>]>) | undefined;
  @Input() extra_injection?: DataInjection<Data2>;

  all_data_map!: Map<string, Data>;
  all_data!: [string, Data][];
  all_extra_map?: Map<string, Data2>;
  all_extra?: [string, Data2][];
  filter_by!: Column<Data>;
  extra_filter_by?: Column<Data2>;
  filtered_data!: MatTableDataSource<[string, Data], MatPaginator>;
  extra_data?: MatTableDataSource<[string, Data2], MatPaginator>;
  filter: string | number = "";
  extra_filter: string | number = "";
  display_hover: [string, Data | undefined] = ["-1", undefined];
  extra_display_hover: [string, Data2 | undefined] = ["-1", undefined];

  @Input() change_injection?: ChangeInjection<Data>;
  @Input() extra_change_injection?: ChangeInjection<Data2>;

  // These fields are used by the hovering display only

  mouseX = 0;
  mouseY = 0;
  mouseMoveSubject = new Subject<MouseEvent>();
  mouseMove$: Observable<MouseEvent>;
  hover_list: [string, Data2][] = [];
  extra_list: [string, Data][] = [];


  constructor(private cdr: ChangeDetectorRef) {

    this.mouseMove$ = this.mouseMoveSubject.asObservable().pipe(

      debounceTime(1) // debounce time in milliseconds

    );

  }

  ngOnInit() {
    this.mouseMove$.subscribe((event: MouseEvent) => {

      if (this.all_extra) {

        this.hover_list = this.all_extra.filter(t => {

          if (this.data_injection && this.data_injection.hover_fetcher && this.display_hover[1] && this.all_extra) {

            return t[0] == this.display_hover[1][this.data_injection.hover_fetcher.key];

          } else {

            return false;

          }

        });


        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

      }

      if (this.extra_injection && this.extra_injection.hover_fetcher && this.extra_display_hover[1]) {

        this.extra_list = this.all_data.filter(t => t[0] == this.extra_injection?.hover_fetcher?.key);

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

      }


    });
  }



  ngAfterViewInit() {

    this.filtered_data = new MatTableDataSource();

    // The initial filter will default to the first column
    this.filter_by = this.data_injection.displayed_columns[0];

    // Fixed sorting
    this.filtered_data.sortingDataAccessor = (data, id: string) => {

      const column = this.data_injection.displayed_columns.find((data: Column<Data>) => data.key == id);
      switch (column?.type) {

        case "link":

          // This will sort based on the linked value
          return column.link?.format(this.getExtra(data[1][id as keyof Data] as number)) as string | number;

      }
      return data[1][id as keyof Data] as string | number;

    };

    // This reflects the first table logic on the second if it exists
    if (this.extra_injection) {

      this.extra_data = new MatTableDataSource();
      this.extra_filter_by = this.extra_injection?.displayed_columns[0];

      this.extra_data.sortingDataAccessor = (data, id: string) => {

        return data[1][id as keyof Data2] as string | number;

      };


    }

    // Fetches both tables at the same time
    if (this.dual_fetcher) {

      this.dual_fetcher().subscribe(result => {

        if (this.extra_injection && this.extra_data) {

          this.all_data_map = result[0];
          this.all_extra_map = result[1];

          this.all_data = Array.from(result[0]);
          this.all_extra = Array.from(result[1]);

          this.filtered_data.data = this.all_data;
          this.extra_data.data = this.all_extra;


        }
      });


    } else if (this.data_injection.data_fetcher) {

      this.data_injection.data_fetcher().subscribe((result => {

        this.all_data_map = result;
        this.all_data = Array.from(result);
        this.filtered_data.data = this.all_data;

      }));

      if (this.extra_injection?.data_fetcher) {

        this.extra_injection.data_fetcher()?.subscribe((result => {

          if (this.extra_data) {

            this.all_extra_map = result;
            this.all_extra = Array.from(result);
            this.extra_data.data = this.all_extra;

          }

        }));



      }


    }

    this.cdr.detectChanges();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {

    if (this.display_hover || this.extra_display_hover) {

      this.mouseMoveSubject.next(event);

    }

  }

  getExtra(id: unknown) {

    const temp = this.all_extra?.find(value => value[0] == id)?.[1];

    if (temp) {

      return temp;

    } else {

      return undefined;

    }

  }

  parseInt(num: string | number) {

    return parseInt(num);

  }

  formatWord(word: string | number | symbol | undefined) {

    return formatWord(word);

  }

  

}

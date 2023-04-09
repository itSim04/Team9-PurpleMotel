import { User } from 'src/app/models/User';
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

export function parsePermission(permission: number | undefined): boolean[] {

  if (permission === 0 || !permission) {
    return [false, false, false];
  }
  let binary = '';
  let number = permission;
  while (number > 0) {
    binary = (number % 2) + binary;
    number = Math.floor(number / 2);
  }

  binary = binary.toString().padStart(3, '0');

  return [binary.charAt(0) == '1', binary.charAt(1) == '1', binary.charAt(2) == '1'];

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

  all_data_map: Map<string, Data> = new Map();
  all_data: [string, Data][] = [];
  all_extra_map: Map<string, Data2> = new Map();
  all_extra: [string, Data2][] = [];
  filter_by!: Column<Data>;
  extra_filter_by?: Column<Data2>;
  filtered_data: MatTableDataSource<[string, Data], MatPaginator> = new MatTableDataSource();
  extra_data: MatTableDataSource<[string, Data2], MatPaginator> = new MatTableDataSource();
  filter: string | number = "";
  extra_filter: string | number = "";
  display_hover: [string, Data | undefined] = ["-1", undefined];
  extra_display_hover: [string, Data2 | undefined] = ["-1", undefined];
  loading: boolean = false;
  extra_loading: boolean = false;

  @Input() change_injection?: ChangeInjection<Data>;
  @Input() extra_change_injection?: ChangeInjection<Data2>;

  // These fields are used by the hovering display only

  mouseX = 0;
  mouseY = 0;
  mouseMoveSubject = new Subject<MouseEvent>();
  mouseMove$: Observable<MouseEvent>;
  hover_list: [string, Data2][] = [];
  extra_list: [string, Data][] = [];


  constructor (private cdr: ChangeDetectorRef) {

    this.mouseMove$ = this.mouseMoveSubject.asObservable().pipe(

      debounceTime(1) // debounce time in milliseconds

    );

  }

  ngOnInit() {
    this.mouseMove$.subscribe((event: MouseEvent) => {

      if (this.data_injection.hover_fetcher) {

        if (this.all_extra) {

          this.hover_list = this.all_extra.filter(t => {

            if (this.data_injection && this.data_injection.hover_fetcher && this.display_hover[1] && this.all_extra) {

              return t[0] == this.display_hover[1][this.data_injection.hover_fetcher.key];

            } else {

              return false;

            }

          });


        }
      }

      if (this.extra_injection && this.extra_injection.hover_fetcher && this.extra_display_hover[1]) {

        this.extra_list = this.all_data.filter(t => t[0] == this.extra_injection?.hover_fetcher?.key);

      }

      if (this.data_injection.hover_display || this.data_injection.hover_fetcher || this.extra_injection?.hover_display || this.extra_injection?.hover_fetcher)
        this.mouseX = event.clientX;
      this.mouseY = event.clientY;

    });
  }



  ngAfterViewInit() {

    this.loading = true;
    if (this.extra_injection) {

      this.extra_loading = true;

    }

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

      this.extra_filter_by = this.extra_injection?.displayed_columns[0];

      this.extra_data.sortingDataAccessor = (data, id: string) => {

        return data[1][id as keyof Data2] as string | number;

      };


    }

    // Fetches both tables at the same time
    if (this.dual_fetcher) {

      this.loadBothData();


    } else if (this.data_injection.data_fetcher) {


      this.loadPrimaryData();

      this.loadSecondaryData();


    }

    this.cdr.detectChanges();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {


    if (this.display_hover || this.extra_display_hover) {

      this.mouseMoveSubject.next(event);

    }

  }

  extractUser() {

    const user = localStorage.getItem('user');
    if (user) {

      return JSON.parse(user) as User;

    } else {

      return undefined;

    }

  }

  extractPermission(operation: 'read' | 'write' | 'delete', permission: string): boolean {

    if (this.extractUser()?.tier == '2') {

      return true;

    }

    try {

      const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');

      let target: number;
      switch (operation) {

        case 'read':
          target = 0;
          break;

        case 'write':
          target = 1;
          break;

        case 'delete':
          target = 2;
          break;

      };
      return permissions[permission][target];

    } catch (e: unknown) {

      return false;

    }

  }


  loadBothData() {

    this.loading = true;
    this.extra_loading = true;
    if (this.extractPermission('read', this.data_injection.permission) || this.extractPermission('read', this.extra_injection!.permission)) {
      
      this.dual_fetcher!().subscribe({

        next: result => {

          if (this.extra_injection && this.extra_data) {

            if (this.extractPermission('read', this.data_injection.permission)) {

              this.all_data = Array.from(result[0]);
              this.all_data_map = result[0];
              this.filtered_data.data = this.all_data;

            }



            if (this.extractPermission('read', this.extra_injection.permission)) {

              this.all_extra = Array.from(result[1]);
              this.all_extra_map = result[1];
              this.extra_data.data = this.all_extra;

            }

            this.loading = false;
            this.extra_loading = false;



          }
        },
        error: error => {

          this.loading = true;
          this.extra_loading = true;
          setTimeout(() => {
            this.loadPrimaryData();
          }, 5000);

        }
      });
    }

  }
  loadPrimaryData() {

    this.loading = true;

    if (!this.extractPermission('read', this.data_injection.permission)) {

      this.loading = false;

    } else if (this.data_injection.data_fetcher)

      this.data_injection.data_fetcher().subscribe(({

        next: result => {

          this.all_data_map = result;
          this.all_data = Array.from(result);
          this.filtered_data.data = this.all_data;
          this.loading = false;

        }, error: error => {

          this.loading = true;
          setTimeout(() => {
            this.loadPrimaryData();
          }, 5000);


        }
      }));

  }

  loadSecondaryData() {

    this.extra_loading = true;

    if (!this.extractPermission('read', this.extra_injection!.permission)) {

      this.extra_loading = false;

    } else if (this.extra_injection?.data_fetcher) {

      this.extra_injection.data_fetcher()?.subscribe(({

        next: result => {

          if (this.extra_data) {

            this.all_extra_map = result;
            this.all_extra = Array.from(result);
            this.extra_data.data = this.all_extra;
            this.extra_loading = false;

          }

        }, error: error => {

          this.extra_loading = true;
          setTimeout(() => {
            this.loadSecondaryData();
          }, 5000);

        }


      }));



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

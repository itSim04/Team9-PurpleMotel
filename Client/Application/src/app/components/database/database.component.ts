import { information } from './../../services/language/language.module';
import { InformationDatabaseService } from '../../services/providers/information-database.service';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { User } from 'src/app/models/User';
import { Component, Input, OnInit, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, Observable, Subject } from 'rxjs';
import { DataInjection, Column, ChangeInjection } from 'src/app/models/Database';
import { UrlBuilderService } from 'src/app/services/utility/url-builder.service';

export function extractUser(validity_check: boolean = true) {

  const user = localStorage.getItem('user');
  if (user) {

    return JSON.parse(user) as User;

  } else {

    return undefined;

  }


}
export function formatDate(date: Date): string {

  let minutes: string = String(date.getMinutes());
  let hours: number = date.getHours() % 12;
  if (hours == 0) hours = 12;

  if (minutes.length == 1) {
    minutes = 0 + minutes;
  }

  return hours + ":" + minutes + (date.getHours() > 11 ? " PM" : " AM");

}

export function extractUserId() {

  const user_id = localStorage.getItem('id');
  if (user_id) {

    return user_id;

  } else {

    return undefined;

  }

}
export function extractUserToken() {

  const user_id = localStorage.getItem('token');
  if (user_id) {

    return user_id;

  } else {

    return undefined;

  }

}


export function extractPermission(operation: 'read' | 'write' | 'delete', permission: string): boolean {

  if (extractUser()?.tier == '2') {

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
export function extractAnyPermission(): boolean {

  if (extractUser()?.tier == '2') {

    return true;

  }

  try {

    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');

    return !!permissions.length;

  } catch (e: unknown) {

    return false;

  }

}


export function formatWord(word: string | number | symbol | undefined) {

  if (!word) return "";

  const splits = word.toString().replaceAll(/\_/g, " ").split(" ");
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

export function formatPrice(price: number | undefined, reversed = false, visible = true): string {

  if (price) {

    const temp = Math.ceil(price).toLocaleString();

    // var str = price.toString().split('.');
    // if (str[0].length >= 5) {
    //   str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    // }
    // if (str[1] && str[1].length >= 5) {
    //   str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    // }

    // const temp = str.join('.');

    if (visible) {

      if (reversed) {

        return temp + " USD";

      } else {

        return "USD " + temp;

      }
    } else {

      return temp;

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
  @Input() dual_fetcher: (() => Observable<[Map<string, Data>, Map<string, Data2>, Map<string, unknown>[] | undefined]>) | undefined;
  @Input() extra_injection?: DataInjection<Data2>;

  all_data_map: Map<string, Data> = new Map();
  all_data: [string, Data][] = [];
  all_extra_map: Map<string, Data2> = new Map();
  all_extra: [string, Data2][] = [];
  all_data_outer: (Map<string, unknown>)[] | undefined;
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
  hover_list: [string, unknown][] = [];
  extra_list: [string, Data][] = [];
  extra_error: boolean = false;
  error: boolean = false;


  constructor (private cdr: ChangeDetectorRef, public router: Router, private information_service: InformationDatabaseService, private url: UrlBuilderService) {

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
      } else if (this.data_injection.hover_linker) {


        if (this.all_data_outer) {

          this.hover_list = Array.from(this.all_data_outer[this.data_injection.hover_linker.index]).filter(t => {

            if (this.data_injection.hover_linker && this.display_hover[1] && this.all_extra) {

              return this.data_injection.hover_linker.filter(t[0], this.display_hover[1][this.data_injection.hover_linker.key]);

            } else {

              return false;

            }


          });

        }

      }

      if (this.extra_injection && this.extra_injection.hover_fetcher && this.extra_display_hover[1]) {

        this.extra_list = this.all_data.filter(t => t[0] == this.extra_injection?.hover_fetcher?.key);

      }

      if (this.data_injection.hover_display || this.data_injection.hover_fetcher || this.extra_injection?.hover_display || this.extra_injection?.hover_fetcher || this.data_injection.hover_linker || this.extra_injection?.hover_linker) {

        this.mouseX = event.clientX;
        this.mouseY = event.clientY;

      }

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

      if (this.extra_injection) {

        this.loadSecondaryData();

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


  loadBothData() {

    this.loading = true;
    this.extra_loading = true;
    this.error = false;
    this.extra_error = false;
    if (extractPermission('read', this.data_injection.permission) || extractPermission('read', this.extra_injection!.permission)) {

      this.dual_fetcher!().subscribe({

        next: result => {

          if (this.extra_injection && this.extra_data) {

            if (extractPermission('read', this.data_injection.permission)) {

              this.all_data = Array.from(result[0]);
              this.all_data_map = result[0];
              this.filtered_data.data = this.all_data;

            } else {

              this.error = true;

            }

            if (extractPermission('read', this.extra_injection.permission)) {

              this.all_extra = Array.from(result[1]);
              this.all_extra_map = result[1];
              this.extra_data.data = this.all_extra;

            } else {

              this.extra_error = true;

            }

            this.all_data_outer = result[2];

            console.log(this.all_data_outer);

            this.loading = false;
            this.extra_loading = false;



          }
        },
        error: error => {


          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            localStorage.removeItem('token_time');
            this.router.navigate(['/home']);
            this.loading = false;
            this.extra_loading = false;



          } else {
            this.loading = true;
            this.extra_loading = true;
            setTimeout(() => {
              this.loadPrimaryData();
            }, 5000);

          }
        }
      });
    }

  }
  loadPrimaryData() {

    this.loading = true;

    if (!extractPermission('read', this.data_injection.permission)) {

      this.loading = false;
      this.error = true;

    } else if (this.data_injection.data_fetcher) {

      this.data_injection.data_fetcher().subscribe(({

        next: result => {

          this.all_data_map = result[0];
          this.all_data = Array.from(result[0]);
          this.all_data_outer = result[1];
          this.filtered_data.data = this.all_data;
          this.loading = false;


        }, error: error => {

          console.error(error);

          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            localStorage.removeItem('token_time');
            this.router.navigate(['/home']);
            this.loading = false;

          } else {

            this.loading = true;
            setTimeout(() => {
              this.loadPrimaryData();
            }, 5000);

          }



        }
      }));
    }

  }

  loadSecondaryData() {

    this.extra_loading = true;

    if (!extractPermission('read', this.extra_injection!.permission)) {

      this.extra_loading = false;
      this.extra_error = true;

    } else if (this.extra_injection?.data_fetcher) {

      this.extra_injection.data_fetcher()?.subscribe(({

        next: result => {

          if (this.extra_data) {

            this.all_extra_map = result[0];
            this.all_extra = Array.from(result[0]);
            this.all_data_outer = result[1];
            this.extra_data.data = this.all_extra;
            this.extra_loading = false;

          }

        }, error: error => {

          console.error(error);

          if (error.status == 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('id');
            localStorage.removeItem('token_time');
            this.router.navigate(['/home']);
            this.extra_loading = false;

          } else {

            this.extra_loading = true;
            setTimeout(() => {
              this.loadSecondaryData();
            }, 5000);

          }
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

import { trigger, transition, style, animate } from "@angular/animations";
import { KeyValue } from "@angular/common";
import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Activity } from "src/app/models/Activity";
import { Facility } from "src/app/models/Facility";
import { Registration } from "src/app/models/Registration";
import { ServiceDatabaseService } from "src/app/pages/admin/service-database/service-database.service";

@Component({
  selector: 'app-services',
  templateUrl: './browse-services.component.html',
  styleUrls: ['./browse-services.component.scss'],
  animations: [
    trigger('fadeOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ])])]
})
export class BrowseServicesComponent implements OnInit {

  activities: Map<string, Activity> = new Map();
  facilities: Map<string, Facility> = new Map();
  registrations: Map<string, Registration> = new Map();

  constructor(private services_service: ServiceDatabaseService) { }



  activity_key = (a: KeyValue<string, Activity>, b: KeyValue<string, Activity>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };
  facility_key = (a: KeyValue<string, Facility>, b: KeyValue<string, Facility>): number => {
    return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  };

  ngOnInit() {

    this.services_service.getAllActivities().subscribe(data => {

      this.activities = data.activities;
      this.registrations = data.registrations;

    });
    this.services_service.getAllFacilities().subscribe(data => {

      this.facilities = data.facilities

    });


  }

}


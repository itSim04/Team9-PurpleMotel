import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/models/Activity';
import { CarouselComponent } from 'src/app/components/general/carousel/carousel.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ServiceDatabaseService } from 'src/app/pages/admin/service-database/service-database.service';
import { Facility } from 'src/app/models/Facility';

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
export class BrowseServicesComponent implements OnInit, OnDestroy {
  @ViewChild('carousel') carousel !: CarouselComponent;
  activities: Map<string, Activity> = new Map();
  facilities: Map<string, Facility> = new Map();

  subscription?: Subscription;
  activity_index = 0;
  isViewInitialized = false;
  constructor(private service_service: ServiceDatabaseService) {

  }

  ngOnInit(): void {
    this.subscription = this.service_service.getAllActivities().subscribe(data => {
      this.activities = data.activities;
    })
    this.subscription = this.service_service.getAllFacilities().subscribe(data => {
      this.facilities = data.facilities;
    })

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  moveIndex(target: string, change: number) {


    switch (target) {

      case 'activity':

        this.activity_index += change;
        break;


    }

  }

}
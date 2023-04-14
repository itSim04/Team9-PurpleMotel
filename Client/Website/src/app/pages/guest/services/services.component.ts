import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/models/Activity';
import { ServiceDatabaseService } from '../../admin/service-database/service-database.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class BrowseServicesComponent implements OnInit, OnDestroy{

  activities: Map<string, Activity> = new Map();

  subscription?: Subscription;
  constructor (private service_service: ServiceDatabaseService) {

  }
  ngOnInit(): void {
    this.subscription = this.service_service.getAllActivities().subscribe(data=>{
      this.activities = data.activities;
    })

  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}

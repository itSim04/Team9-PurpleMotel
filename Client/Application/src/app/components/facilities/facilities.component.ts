import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Facility } from 'src/app/models/Facility';
import { ServiceDatabaseService } from './facilities.service';
import { Activity } from 'src/app/models/Activity';
import { Registration } from 'src/app/models/Registration';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent{

  @Input() facility?: Facility;

}

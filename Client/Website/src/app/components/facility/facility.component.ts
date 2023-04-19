import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Facility } from 'src/app/models/Facility';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent {
  @Input() facility?: KeyValue<string, Facility>;

}

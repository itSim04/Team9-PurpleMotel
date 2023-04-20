import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Facility } from 'src/app/models/Facility';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss'],
})
export class FacilitiesComponent  implements OnInit {

  constructor() { }
  
  @Input() facility?: KeyValue<string, Facility>;
  ngOnInit() {}

}

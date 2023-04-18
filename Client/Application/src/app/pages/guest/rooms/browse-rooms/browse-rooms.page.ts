import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-browse-rooms',
  templateUrl: './browse-rooms.page.html',
  styleUrls: ['./browse-rooms.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BrowseRoomsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

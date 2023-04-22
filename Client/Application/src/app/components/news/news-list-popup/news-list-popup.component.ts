import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { extractUserId } from '../../database/database.component';
import { NewsDatabaseService } from 'src/app/pages/admin/news-database/news-database.service';

export interface NewsPopup{
  id: string;
  title: string;
  body: string;
  date: string;
  likes: number;
  is_liked: boolean;

}

@Component({
  selector: 'app-news-list-popup',
  templateUrl: './news-list-popup.component.html',
  styleUrls: ['./news-list-popup.component.scss'],
})
export class NewsListPopupComponent  implements OnInit {

  id: string;
  title: string;
  body: string;
  date: string;
  likes: number;
  is_liked: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: NewsPopup, private dialog: MatDialogRef<NewsListPopupComponent>, private news_service: NewsDatabaseService){
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.date = data.date;
    this.likes = data.likes;
    this.is_liked = data.is_liked;
  }

  ngOnInit() {}


  // like() {
  //   const user_id = extractUserId();
    
  //   if (user_id) {
      
  //     console.log(this.is_liked)
      
  //     if (this.is_liked) {
        
  //       this.news_service.unlike(this.id, user_id).subscribe(data => {
          
  //         this.likes -= 1;
  //         this.is_liked = false;
  //       });
        
  //     } else {
        
  //       this.news_service.like(this.id, user_id).subscribe(data => {
          
  //         console.log(data);
  //         this.likes += 1;
  //         this.is_liked = true;
          
  //       });
  //     }
  //   }
  // }
  
}
import { User } from 'src/app/models/User';
import { KeyValue } from "@angular/common";
import { formatDate } from 'src/app/components/database/database.component';
import { Database,getDatabase, onChildAdded,ref} from '@angular/fire/database';
import { Chat } from 'src/app/models/Chat';
import { Router, ActivatedRoute } from "@angular/router";
import { UserDatabaseService } from 'src/app/pages/admin/user-database/user-database.service';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent  implements OnInit {

  constructor (private router: Router, private database: Database, private userService: UserDatabaseService, private route: ActivatedRoute) { }
  @ViewChild('container') private container!: ElementRef;
  loading: boolean = true; // Whether the page is still loading
  chat_loading: boolean = true; // Whether the page is still loading
  active_guests: KeyValue<string, User>[] = [];
  active_last_messages: { lastDate: string, lastMessage: string; }[] = [];
  id?: string; // The id of the chat (x-y)
  chat?: Chat; // The chat this class holds
  session_user!: KeyValue<string, User>; // The logged in user
  all_users: Map<string, User> = new Map<string, User>();
  db: Database = getDatabase(); // Instance of firebase

  ngOnInit() {
    this.userService.getAllUsers().subscribe(u => {

      this.all_users = u.users;

      const chatsRef = ref(this.db, 'chats/');

      onChildAdded(chatsRef, (snapshot) => {


        const temp = this.all_users.get(snapshot.key || '');


        if (temp) {

          if (snapshot.key == this.id) {

            this.chat_loading = true;

          } else {
            this.chat_loading = false;

            this.active_guests.push({ key: snapshot.key || '0', value: temp });
            this.active_last_messages.push((snapshot.val() as { lastDate: string, lastMessage: string; }));

          }
        }

      });


      if (this.id != '0') {

        this.download();

      } else {

        this.loading = false;
      }



    });
  }


  formatDateString(date: string): string {

    // Formats the date in a readable format

    return formatDate(new Date(date));


  }
  download() {

    this.loading = true;

    this.chat = {

      user_1: this.session_user,
      user_2: this.all_users.getPair(this.id!)!,
      lastMessage: {

        content: '',
        owner_id: '-1',
        date: new Date()

      },
      messages: [],
      start: new Date()

    };

    const commentsRef = ref(this.db, 'messages/' + this.id);

    onChildAdded(commentsRef, (snapshot) => {

      this.loading = false;

      const data = snapshot.val();

      if (data["sender"] == this.session_user.key || data["sender"] == this.id) {

        // console.log(data["sender"], this.session_user.key, this.id)
        this.chat?.messages.push({

          content: data["message"],
          date: new Date(data["timestamp"]),
          owner_id: data["sender"]


        });

        setTimeout(() => {


          this.container.nativeElement.scrollTo({ left: 0, top: this.container.nativeElement.scrollHeight, behavior: 'smooth' });

        });
      }

    });

  }

  routeTo(id: string) {

    this.router.navigate(['adminchat/' + id]);
    this.id = String(id);
    this.download();

  }

}

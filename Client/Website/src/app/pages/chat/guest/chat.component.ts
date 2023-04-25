import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Database, DatabaseReference, getDatabase, onChildAdded, onValue, push, ref, runTransaction, set, update } from '@angular/fire/database';
import { extractSessionUser, User } from "src/app/models/User";
import { Chat, Message } from "src/app/models/Chat";
import { UserDatabaseService } from "src/app/services/providers/user-database.service";
import { extractUserId, formatDate } from "src/app/components/database/database.component";


@Component({
  selector: 'app-chats',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class GuestChatsPageComponent implements OnInit {

  // Holds a conversation
  loading: boolean = true; // Whether the page is still loading
  message: string = ""; // The current message

  hovered_id = -1;

  session_user!: KeyValue<string, User>; // The logged in user

  db: Database = getDatabase(); // Instance of firebase
  id?: string; // The id of the chat (x-y)
  chat?: Chat; // The chat this class holds
  constructor (private router: Router, private database: Database, private userService: UserDatabaseService, private route: ActivatedRoute) { }

  ngOnInit() {

    // Retrieves the messages from Firebase

    this.db = getDatabase();
    this.id = String(this.route.snapshot.paramMap.get("id"));


    this.session_user = {

      key: extractUserId()!,
      value: extractSessionUser()!

    };

    this.userService.getOneUser(Number.parseInt(this.id)).subscribe(u => {

      this.chat = {

        user_1: this.session_user,
        user_2: u.user,
        lastMessage: {

          content: '',
          owner_id: '-1',
          date: new Date()

        },
        messages: [],
        start: new Date()

      };

      const commentsRef = ref(this.db, 'messages/' + this.id);

      setTimeout(() => {

        this.loading = false

      }, 2000);
      onChildAdded(commentsRef, (snapshot) => {

        this.loading = false;

        const data = snapshot.val();

        this.chat?.messages.push({

          content: data["message"],
          date: new Date(data["timestamp"]),
          owner_id: data["sender"]


        });

      });

    });
  }



  // seperateOwner(id: string): string {

  //   // Analyzes the ID and returns the other user's id

  //   if (id.split('-')[0] == String(this.session_user.key)) {

  //     return id.split('-')[1];

  //   }

  //   if (id.split('-')[1] == String(this.session_user.key)) {

  //     return id.split('-')[0];

  //   }

  //   throw new Error("Illegal argument Exception");
  // }



  postMessage() {

    // Posts the message

    const postListRef = ref(this.db, 'messages/' + this.id);

    const current_date = new Date();

    set(push(postListRef), {

      message: this.message,
      sender: this.session_user!.key,
      timestamp: current_date.toISOString()

    }).catch(r => console.log(r));

    const chatRef = ref(this.db, 'chats/' + this.id);

    update(chatRef, {

      lastMessage: this.message,
      lastDate: current_date.toISOString(),
      lastSender: this.session_user.key

    }).catch(r => console.log(r));

    const postRef: DatabaseReference = ref(this.db, "users/" + this.id + "/chats/");

    runTransaction(postRef, (post) => {

      if (!post) {

        post = {

          [this.id!]: current_date.toISOString()

        };

      } else if (!post[this.id!]) {

        post[this.id!] = current_date.toISOString();

      }
      return post;
    }).catch(r => console.log(r));

    this.message = "";

  }

  formatDate(date: Date): string {

    // Formats the date in a readable format

    return formatDate(date);

  }

  goBack() {

    // Goes back to the Chat selection screen

    this.router.navigate(["home"]);

  }

  // Defines border logic for messages
  topLeft(c: Message, i: number) {

    if (i == 0 || this.formatDate(this.chat?.messages![i - 1].date!) != this.formatDate(c.date) || c.owner_id == this.session_user.key) {

      return '20px';

    } else if (i > 0 && this.chat?.messages![i - 1].owner_id == c.owner_id) {

      return '5px';

    } else {

      return '20px';

    }

  }

  bottomRight(c: Message, i: number) {

    if (i == this.chat?.messages!.length! - 1 || this.formatDate(this.chat?.messages![i + 1].date!) != this.formatDate(c.date) || c.owner_id != this.session_user.key) {

      return '20px';

    } else if (i < this.chat?.messages!.length! - 1 && this.chat?.messages![i + 1].owner_id == c.owner_id) {

      return '5px';

    } else {

      return '20px';

    }
  }

  bottomLeft(c: Message, i: number) {

    if (i == this.chat?.messages!.length! - 1 || this.formatDate(this.chat?.messages![i + 1].date!) != this.formatDate(c.date) || c.owner_id == this.session_user.key) {

      return '20px';

    } else if (i < this.chat?.messages!.length! - 1 && this.chat?.messages![i + 1].owner_id == c.owner_id) {

      return '5px';

    } else {

      return '20px';

    }
  }

  topRight(c: Message, i: number) {

    if (i == 0 || this.formatDate(this.chat?.messages![i - 1].date!) != this.formatDate(c.date) || c.owner_id != this.session_user.key) {

      return '20px';

    } else if (i > 0 && this.chat?.messages![i - 1].owner_id == c.owner_id) {

      return '5px';

    } else {

      return '20px';

    }
  }





}

